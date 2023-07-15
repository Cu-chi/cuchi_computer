CREATE TABLE IF NOT EXISTS `computers_market` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `seller` varchar(40) COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(16) COLLATE utf8mb4_bin NOT NULL,
  `description` varchar(512) COLLATE utf8mb4_bin DEFAULT NULL,
  `timestamp` int(11) DEFAULT unix_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE IF NOT EXISTS `computers_mail_accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identifier` varchar(40) COLLATE utf8mb4_bin NOT NULL,
  `username` varchar(16) COLLATE utf8mb4_bin NOT NULL,
  `password` varchar(32) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE IF NOT EXISTS `computers_mail_mails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `from` varchar(16) COLLATE utf8mb4_bin NOT NULL,
  `to` varchar(16) COLLATE utf8mb4_bin NOT NULL,
  `object` varchar(32) COLLATE utf8mb4_bin DEFAULT NULL,
  `text` varchar(4096) COLLATE utf8mb4_bin DEFAULT NULL,
  `answer_to` int(11) DEFAULT NULL,
  `timestamp` int(11) DEFAULT unix_timestamp(),
  `read` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
