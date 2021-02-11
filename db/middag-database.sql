-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema middagsdelingsdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `middagsdelingsdb` DEFAULT CHARACTER SET latin1 ;
USE `middagsdelingsdb` ;

-- -----------------------------------------------------
-- Table `middagsdelingsdb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `middagsdelingsdb`.`users` (
  `user_id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL,
  `isAdmin` TINYINT(1) DEFAULT 0,
  `Allergies` VARCHAR(255),
  `has_dinners_id` INT(11),
  `rating_id` INT(11) DEFAULT 0,
  `chatted_to` INT(11),
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `middagsdelingsdb`.`dinner`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `middagsdelingsdb`.`dinner` (
  `dinner_id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `adress` VARCHAR(255) NOT NULL,
  `type` VARCHAR(255) NOT NULL,
  `allergens` VARCHAR(255) NOT NULL,
  `attendants` INT(11) NOT NULL,
  `isDivided` TINYINT(1) DEFAULT 0,
  `isOpen` TINYINT(1) DEFAULT 0,
  `expenses` DOUBLE NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date` DATE NOT NULL,
  PRIMARY KEY (`dinner_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

-- -----------------------------------------------------
-- Table `middagsdelingsdb`.`attendingDinner`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `middagsdelingsdb`.`attendingDinner` (
  `user_id` INT(11) NOT NULL,
  `dinner_id` INT(11) NOT NULL,
  INDEX `user_id_idx` (`user_id` ASC),
  INDEX `dinner_id_idx` (`dinner_id` ASC),
  PRIMARY KEY (`user_id`, `dinner_id`),
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `middagsdelingsdb`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `dinner_id`
    FOREIGN KEY (`dinner_id`)
    REFERENCES `middagsdelingsdb`.`dinner` (`dinner_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

-- -----------------------------------------------------
-- Table `middagsdelingsdb`.`rating`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `middagsdelingsdb`.`rating` (
  `rated_of` INT(11) NOT NULL,
  `rated_by` INT(11) NOT NULL,
  `rating_value` INT(11) NOT NULL,
  `Description` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL,
  INDEX `rated_of_idx` (`rated_of` ASC),
  INDEX `rated_by_idx` (`rated_by` ASC),
  PRIMARY KEY (`rated_of`, `rated_by`),
  CONSTRAINT `rated_of`
    FOREIGN KEY (`rated_of`)
    REFERENCES `middagsdelingsdb`.`dinner` (`dinner_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `rated_by`
    FOREIGN KEY (`rated_by`)
    REFERENCES `middagsdelingsdb`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `middagsdelingsdb`.`hasDinners`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `middagsdelingsdb`.`hasDinners` (
  `dinner_id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL,
  `average_rating` INT(11) NOT NULL,
  INDEX `dinner_idx` (`dinner_id` ASC),
  INDEX `user_id_idx` (`user_id` ASC),
  PRIMARY KEY (`user_id`, `dinner_id`),
  CONSTRAINT `user_id_idx`
    FOREIGN KEY (`user_id`)
    REFERENCES `middagsdelingsdb`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `dinner_idx`
    FOREIGN KEY (`dinner_id`)
    REFERENCES `middagsdelingsdb`.`dinner` (`dinner_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

-- -----------------------------------------------------
-- Table `middagsdelingsdb`.`chat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `middagsdelingsdb`.`chat` (
  `chat_to` INT(11) NOT NULL,
  `chat_from` INT(11) NOT NULL,
  `message` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  INDEX `chat_to_idx` (`chat_to` ASC),
  INDEX `chat_from_idx` (`chat_from` ASC),
  PRIMARY KEY (`chat_to`, `chat_from`),
  CONSTRAINT `chat_to`
    FOREIGN KEY (`chat_to`)
    REFERENCES `middagsdelingsdb`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `chat_from`
    FOREIGN KEY (`chat_from`)
    REFERENCES `middagsdelingsdb`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
