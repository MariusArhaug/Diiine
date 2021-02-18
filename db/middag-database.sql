SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

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
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isAdmin` TINYINT(1) DEFAULT 0,
  `Allergies` VARCHAR(255),
  `has_dinners_id` INT(11),
  `rating_id` INT(11) DEFAULT 0,
  `chatted_to` INT(11),
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `fs_tdt4140_1_gruppe40_mddb`.`dinners`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fs_tdt4140_1_gruppe40_mddb`.`dinners` (
  `dinners_id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `adress` VARCHAR(255) NOT NULL,
  `type` VARCHAR(255) NOT NULL,
  `allergens` VARCHAR(255) NOT NULL,
  `attendants` INT(11) NOT NULL,
  `isDivided` TINYINT(1) DEFAULT 0,
  `isOpen` TINYINT(1) DEFAULT 0,
  `expenses` DOUBLE NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date` DATE NOT NULL,
  PRIMARY KEY (`dinners_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

-- -----------------------------------------------------
-- Table `fs_tdt4140_1_gruppe40_mddb`.`attendingdinners`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fs_tdt4140_1_gruppe40_mddb`.`attendingdinners` (
  `user_id` INT(11) NOT NULL,
  `dinners_id` INT(11) NOT NULL,
  INDEX `user_id_idx` (`user_id` ASC),
  INDEX `dinners_id_idx` (`dinners_id` ASC),
  PRIMARY KEY (`user_id`, `dinners_id`),
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `fs_tdt4140_1_gruppe40_mddb`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `dinners_id`
    FOREIGN KEY (`dinners_id`)
    REFERENCES `fs_tdt4140_1_gruppe40_mddb`.`dinners` (`dinners_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

-- -----------------------------------------------------
-- Table `fs_tdt4140_1_gruppe40_mddb`.`rating`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fs_tdt4140_1_gruppe40_mddb`.`rating` (
  `rated_of` INT(11) NOT NULL,
  `rated_by` INT(11) NOT NULL,
  `rating_value` INT(11) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `rated_of_idx` (`rated_of` ASC),
  INDEX `rated_by_idx` (`rated_by` ASC),
  PRIMARY KEY (`rated_of`, `rated_by`),
  CONSTRAINT `rated_of`
    FOREIGN KEY (`rated_of`)
    REFERENCES `fs_tdt4140_1_gruppe40_mddb`.`dinners` (`dinners_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `rated_by`
    FOREIGN KEY (`rated_by`)
    REFERENCES `fs_tdt4140_1_gruppe40_mddb`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `fs_tdt4140_1_gruppe40_mddb`.`hasdinnerss`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fs_tdt4140_1_gruppe40_mddb`.`hasdinners` (
  `dinners_id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `average_rating` INT(11) NOT NULL,
  INDEX `dinners_idx` (`dinners_id` ASC),
  INDEX `user_id_idx` (`user_id` ASC),
  PRIMARY KEY (`user_id`, `dinners_id`),
  CONSTRAINT `user_id_idx`
    FOREIGN KEY (`user_id`)
    REFERENCES `fs_tdt4140_1_gruppe40_mddb`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `dinners_idx`
    FOREIGN KEY (`dinners_id`)
    REFERENCES `fs_tdt4140_1_gruppe40_mddb`.`dinners` (`dinners_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

-- -----------------------------------------------------
-- Table `fs_tdt4140_1_gruppe40_mddb`.`chat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fs_tdt4140_1_gruppe40_mddb`.`chat` (
  `chat_to` INT(11) NOT NULL,
  `chat_from` INT(11) NOT NULL,
  `message` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  INDEX `chat_to_idx` (`chat_to` ASC),
  INDEX `chat_from_idx` (`chat_from` ASC),
  PRIMARY KEY (`chat_to`, `chat_from`),
  CONSTRAINT `chat_to`
    FOREIGN KEY (`chat_to`)
    REFERENCES `fs_tdt4140_1_gruppe40_mddb`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `chat_from`
    FOREIGN KEY (`chat_from`)
    REFERENCES `fs_tdt4140_1_gruppe40_mddb`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
