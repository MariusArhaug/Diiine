// users-model.ts - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
import { Application } from '../declarations';
import Knex from 'knex';

export default function (app: Application): Knex {
  const db: Knex = app.get('knexClient');
  const tableName = 'users';

  /* 
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
*/
  
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id');
        
        table.string('name').notNullable;
        table.string('email').unique();
        table.string('password');
        table.boolean('isAdmin');
      
      
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });

  return db;
}
