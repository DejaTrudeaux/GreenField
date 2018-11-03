CREATE DATABASE IF NOT EXISTS BookSwap;

USE BookSwap;

DROP TABLE IF EXISTS `requests`;
DROP TABLE IF EXISTS `userbooklist`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `books`;

		
CREATE TABLE `users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(25) NULL DEFAULT NULL,
  `password` VARCHAR(100) NULL DEFAULT NULL,
  `email` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

		
CREATE TABLE `books` (
  `ISBN` VARCHAR(13) NOT NULL,
  `title` MEDIUMTEXT NULL DEFAULT NULL,
  `description` MEDIUMTEXT NULL DEFAULT NULL,
  `author` VARCHAR(50) NULL DEFAULT NULL,
  `genere` VARCHAR(30) NULL DEFAULT NULL,
  `imageLink` VARCHAR(160) NULL DEFAULT NULL,
  PRIMARY KEY (`ISBN`)
);
		
CREATE TABLE `userbooklist` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `ISBN_books` VARCHAR(13) NOT NULL,
  `id_users` INTEGER NOT NULL,
  PRIMARY KEY (`id`),
  
    FOREIGN KEY (`ISBN_books`)
      REFERENCES `books` (`ISBN`),

    FOREIGN KEY (`id_users`)
      REFERENCES `users` (`id`)
);

CREATE TABLE `requests` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `id_users` INTEGER NOT NULL,
  `id_userbooklist` INTEGER NOT NULL,
  PRIMARY KEY (`id`),

  FOREIGN KEY (`id_users`)
    REFERENCES `users` (`id`),

  FOREIGN KEY (`id_userbooklist`)
    REFERENCES `userbooklist` (`id`)  
);