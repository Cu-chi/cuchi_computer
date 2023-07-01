CREATE TABLE `computers_market` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`seller` VARCHAR(40) NOT NULL COLLATE 'utf8mb4_bin',
	`title` VARCHAR(16) NOT NULL COLLATE 'utf8mb4_bin',
	`description` VARCHAR(512) NULL DEFAULT NULL COLLATE 'utf8mb4_bin',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_bin'
ENGINE=InnoDB
;
