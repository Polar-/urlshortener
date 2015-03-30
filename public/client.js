$(document).ready(function(){
	$('#sUrl').hide();
	$('#urlBtn').click(function(){
			get_sUrl();
	});

	$('#lUrl').keyup(function(){
		if (event.which == 13) {
			get_sUrl();
		}
	});	
});

function get_sUrl() {
	var lUrl = $('#lUrl').val();
	console.log(lUrl);
	if (lUrl != '')
	{
		if (lUrl.substr(0, 7) != "http://" && lUrl.substr(0, 8) != 'https://' && lUrl.substr(0,4) != 'data')
		{
			lUrl = 'http://'.concat(lUrl);
		}
		console.log('Enconding url...');
		lUrl = encodeURIComponent(lUrl);
		console.log('Sending '+ lUrl + ' to server...');
		$.get(lUrl + '/new/')
		.done(function(data) {
			console.log('Got response: ' + data);
			if (data == 'Invalid URL.')
				alert('Anna sopiva URL.');
			else
				$('#sUrl').val('http://localhost:3000/' + data);
				$('#sUrl').show();
		});
	}
};