CREATE DATABASE IF NOT EXISTS BookSwap;

USE BookSwap;

DROP TABLE IF EXISTS `requests`;
DROP TABLE IF EXISTS `userbooklist`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `books`;

		
CREATE TABLE `users` (
  -- `id` INTEGER NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(25) NOT NULL,
  `password` VARCHAR(100) NULL DEFAULT NULL,
  `email` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`username`)
);

		
CREATE TABLE `books` (
  `ISBN` VARCHAR(13) NOT NULL,
  `title` MEDIUMTEXT NULL DEFAULT NULL,
  `description` MEDIUMTEXT NULL DEFAULT NULL,
  `author` VARCHAR(50) NULL DEFAULT NULL,
  `genre` VARCHAR(30) NULL DEFAULT NULL,
  `imageLink` VARCHAR(160) NULL DEFAULT NULL,
  PRIMARY KEY (`ISBN`)
);
		
CREATE TABLE `userbooklist` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `ISBN_books` VARCHAR(13) NOT NULL,
  `username_users` VARCHAR(25) NOT NULL,
  PRIMARY KEY (`id`),
  
    FOREIGN KEY (`ISBN_books`)
      REFERENCES `books` (`ISBN`),

    FOREIGN KEY (`username_users`)
      REFERENCES `users` (`username`)
);

CREATE TABLE `requests` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `username_users` VARCHAR(25) NOT NULL,
  `id_userbooklist` INTEGER NOT NULL,
  PRIMARY KEY (`id`),

  FOREIGN KEY (`username_users`)
    REFERENCES `users` (`username`),

  FOREIGN KEY (`id_userbooklist`)
    REFERENCES `userbooklist` (`id`)  
);