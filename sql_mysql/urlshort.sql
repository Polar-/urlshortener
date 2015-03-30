DROP DATABASE IF EXISTS urlshort;
CREATE DATABASE urlshort;
USE urlshort;

CREATE TABLE url (
    id INT AUTO_INCREMENT PRIMARY KEY,
    longurl TEXT,
    shorturl VARCHAR(20)
)ENGINE=InnoDB;
