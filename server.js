var express = require('express');
var mysql = require('mysql');
var winston = require('winston');
var app = express();

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '*****',
  database : 'urlshort'
});

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({filename: __dirname + '/serverlog.log'})
  ]
});

 connection.connect(function(err) {
  if(err) {
    logger.log('info', 'Could not establish a connection to database.');
    return;
  } else {
    logger.log('info', 'Successfully connected to database.');
  }
});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
});


app.get('/:url/new', function(req, res) {
  var urlString = req.params.url;
  var contin = true;
  try {
    urlString = decodeURIComponent(urlString);
  } catch (ex) {
    logger.log('error', ex);
    contin = false;
    res.send('Invalid URL.');
  }
  if (contin) {
    var shorturl = genUrl();
    var qrystring = 'INSERT INTO url(longurl, shorturl) VALUES ("' + urlString + '", "' + shorturl + '");';
    logger.log('info', 'User from ' + req.ip + ' added ' + urlString + ' // ' + shorturl + '.');
    var query = connection.query(qrystring, function(err, rows) {
      if (err) {
        logger.log('error', err);
      } else {
        res.send(shorturl);
      }
    });
  }
});


app.get('/:url', function(req, res) {
  var qrystring = 'SELECT longurl FROM url WHERE shorturl = "' + req.params.url + '";';
  var query = connection.query(qrystring, function(err, rows) {
    if (err) {
      logger.log('error', err);
    } else if (JSON.stringify(rows) == '[]') {
      logger.log('info', 'User from ' + req.ip + ' requested shorturl ' + req.params.url + '. Found no matching url. Sending 404.');
      res.sendFile(__dirname + '/public/error.html');
    } else {
      logger.log('info', 'User from ' + req.ip + ' requested shorturl ' + req.params.url + '. Found matching url ' + rows[0].longurl + '.');
      res.redirect(rows[0].longurl);
    }
  });
});


function genUrl() {
  var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  var string = '';
  for (var i = 0; i < 8; i++)
  {
    var addchar = chars.charAt(Math.floor(Math.random() * chars.length));
    var onetwo = Math.floor(Math.random() * (2) + 1);
    if (onetwo == 1) {
      addchar = addchar.toUpperCase();
    }
    string += addchar;
  }
  return string;
};

var server = app.listen(3000, function () {
	var host = server.address().address;
  var port = server.address().port;
  logger.log('info', 'Listening on port ' + port + '.');
});
