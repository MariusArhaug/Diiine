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
/* 
  // Clean up our data. This is optional and is here
  // because of our integration tests
  db.schema.dropTableIfExists('users').then(() => {
    console.log('Dropped users table');

    // Initialize your table
    return db.schema.createTable('users', table => {
      console.log('Creating users table');
      table.increments('id');
      table.string('name');
      table.string('email');
      table.string('password');
      table.boolean('isAdmin');

      // TODO: Hook for created at and updated at
    });
  }).then(() => {
    // Create a dummy Message
    app.service('users').create({
      name: 'joakim',
      email: 'joakim@middag.no',
      password: 'supersecret'
    }).then(user => console.log('Created user', user));
  }); */

  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id');
        table.string('text');
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });

  return db;
}
