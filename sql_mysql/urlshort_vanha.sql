DROP DATABASE IF EXISTS urlshort;
CREATE DATABASE urlshort;
USE urlshort;

CREATE TABLE url (
    id INT AUTO_INCREMENT PRIMARY KEY,
    longurl VARCHAR(200)
)ENGINE=InnoDB;

CREATE TABLE sUrl (
    id INT AUTO_INCREMENT PRIMARY KEY,
    shorturl VARCHAR(200),
    longurl INT,
    FOREIGN KEY (longurl) REFERENCES url(id)
)ENGINE=InnoDB;

CREATE TRIGGER shorturl_gen AFTER INSERT ON url
  FOR EACH ROW
    INSERT INTO sUrl(shorturl, longurl) VALUES (
        CONCAT(LEFT(NEW.longurl, 4), RIGHT(NEW.longurl, 3)), NEW.id
        );




///
INSERT INTO url(longurl, shorturl) VALUES (
    "www.iltalehti.fi", "k9sd5JDFN"
);

INSERT INTO url(longurl, shorturl) VALUES (
    "iltalehti.fi", "k9djfnSK"
);
///

