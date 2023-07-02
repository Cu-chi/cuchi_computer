CREATE TABLE IF NOT EXISTS `computers_market` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `seller` varchar(40) COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(16) COLLATE utf8mb4_bin NOT NULL,
  `description` varchar(512) COLLATE utf8mb4_bin DEFAULT NULL,
  `timestamp` int(11) DEFAULT unix_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
