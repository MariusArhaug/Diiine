import { Params } from '@feathersjs/feathers';
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

/*
  Incoming dinner object
  {
    name: string,
    adress: string,
    type(tags): string,
    allergens: [
      {
        "gluten": 1,
        "nuts": 0,
        ...
      }
    ],
    attendants: integer,
    date: string
  }
*/

interface DinnerData {
 dinners_id: number,
 name: string,
 adress: string,
 type: string,
 allergens: string,
 attendants: number,
 isDivided: boolean,
 isOpen: boolean,
 expenses: number,
 date: Date,
 user_id: number
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
    const { name, adress, type, allergens, attendants, date, user_id } = data;
    const dinnerData = {
      name,
      adress,
      type,
      allergens,
      attendants,
      date,
      user_id
    };

    // Call the original `create` method with existing `params` and new data
    return super.create(dinnerData, params);
  }
}
