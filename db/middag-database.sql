-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema fs_tdt4140_1_gruppe40_mddb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema fs_tdt4140_1_gruppe40_mddb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `fs_tdt4140_1_gruppe40_mddb` DEFAULT CHARACTER SET latin1 ;
USE `fs_tdt4140_1_gruppe40_mddb` ;

-- -----------------------------------------------------
-- Table `fs_tdt4140_1_gruppe40_mddb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fs_tdt4140_1_gruppe40_mddb`.`users` (
  `user_id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isAdmin` TINYINT(1) NULL DEFAULT '0',
  `allergies` VARCHAR(255) NULL DEFAULT '',
  `avg_rating` INT(11) NULL DEFAULT '0',
  `chatted_to` INT(11) NULL DEFAULT NULL,
  `avatar` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 114
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `fs_tdt4140_1_gruppe40_mddb`.`dinners`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fs_tdt4140_1_gruppe40_mddb`.`dinners` (
  `dinners_id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `date` DATE NOT NULL,
  `ingredients` VARCHAR(255) NOT NULL,
  `tags` VARCHAR(255) NULL DEFAULT NULL,
  `allergens` VARCHAR(255) NULL DEFAULT NULL,
  `attendants` INT(11) NOT NULL,
  `isDivided` TINYINT(1) NULL DEFAULT '0',
  `isOpen` TINYINT(1) NULL DEFAULT '0',
  `expenses` DOUBLE NOT NULL DEFAULT '0',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` INT(11) NOT NULL,
  `banner` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`dinners_id`),
  INDEX `owner_id_idx` (`user_id` ASC),
  CONSTRAINT `user_idx`
    FOREIGN KEY (`user_id`)
    REFERENCES `fs_tdt4140_1_gruppe40_mddb`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 78
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `fs_tdt4140_1_gruppe40_mddb`.`attendingdinners`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fs_tdt4140_1_gruppe40_mddb`.`attendingdinners` (
  `user_id` INT(11) NOT NULL,
  `dinners_id` INT(11) NOT NULL,
  `secondary_pk` INT(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`secondary_pk`),
  INDEX `user_id_idx` (`user_id` ASC),
  INDEX `dinners_id_idx` (`dinners_id` ASC),
  CONSTRAINT `dinners_id`
    FOREIGN KEY (`dinners_id`)
    REFERENCES `fs_tdt4140_1_gruppe40_mddb`.`dinners` (`dinners_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `fs_tdt4140_1_gruppe40_mddb`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 32
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `fs_tdt4140_1_gruppe40_mddb`.`chat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fs_tdt4140_1_gruppe40_mddb`.`chat` (
  `chat_id` INT(11) NOT NULL AUTO_INCREMENT,
  `chat_to` INT(11) NOT NULL,
  `chat_from` INT(11) NOT NULL,
  `message` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`chat_id`),
  INDEX `chat_to_idx` (`chat_to` ASC),
  INDEX `chat_from_idx` (`chat_from` ASC),
  CONSTRAINT `chat_from`
    FOREIGN KEY (`chat_from`)
    REFERENCES `fs_tdt4140_1_gruppe40_mddb`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `chat_to`
    FOREIGN KEY (`chat_to`)
    REFERENCES `fs_tdt4140_1_gruppe40_mddb`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 29
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `fs_tdt4140_1_gruppe40_mddb`.`rating`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fs_tdt4140_1_gruppe40_mddb`.`rating` (
  `rated_of` INT(11) NOT NULL,
  `rated_by` INT(11) NOT NULL,
  `rating_value` DOUBLE NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `rating_id` INT(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`rating_id`),
  INDEX `rated_of_idx` (`rated_of` ASC),
  INDEX `rated_by_idx` (`rated_by` ASC),
  CONSTRAINT `rated_by`
    FOREIGN KEY (`rated_by`)
    REFERENCES `fs_tdt4140_1_gruppe40_mddb`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `rated_of`
    FOREIGN KEY (`rated_of`)
    REFERENCES `fs_tdt4140_1_gruppe40_mddb`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 59
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
