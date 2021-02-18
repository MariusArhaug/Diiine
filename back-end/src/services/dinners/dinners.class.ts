import { Service, KnexServiceOptions } from 'feathers-knex';
import { Application } from '../../declarations';
/* 
CREATE TABLE IF NOT EXISTS `fs_tdt4140_1_gruppe40_mddb`.`dinner` (
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
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date` DATE NOT NULL,
  PRIMARY KEY (`dinner_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1; */

interface DinnerData {
 dinner_id: number,
 name: string,
 adress: string,
 type: string,
 allergens: string,
 attendants: number,
 isDivided: boolean,
 isOpen: boolean,
 expenses: number,
 date: Date,
}

export class Dinners extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<KnexServiceOptions>, app: Application) {
    super({
      ...options,
      name: 'dinners'
    });
  }

  async create (data: DinnerData, params?: Params) {
    // This is the information we want from the user signup data
    const { name, adress, type, allergens } = data;
    const dinnerData = {
      name,
      adress,
      type,
      allergens
    };

    // Call the original `create` method with existing `params` and new data
    return super.create(dinnerData, params);
  }
}
