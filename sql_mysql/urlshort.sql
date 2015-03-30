DROP DATABASE IF EXISTS urlshort;
CREATE DATABASE urlshort;
USE urlshort;

CREATE TABLE url (
    id INT AUTO_INCREMENT PRIMARY KEY,
    longurl TEXT,
    shorturl VARCHAR(20)
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
