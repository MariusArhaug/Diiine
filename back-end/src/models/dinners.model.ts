// dinners-model.ts - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
import Knex from 'knex';
import { Application } from '../declarations';

export default function (app: Application): Knex {
  const db: Knex = app.get('knexClient');
  const tableName = 'dinners';
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('dinner_id');
        table.string('name');
        table.string('adress');
        table.string('type');
        table.string('allergens');
        table.integer('attendants');
        table.integer('isDivided');
        table.integer('isOpen');
        table.double('expenses');
        table.timestamp('created_at').defaultTo(db.fn.now());
        table.timestamp('updated_at').defaultTo(db.fn.now());
        table.date('date');
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });
  

  return db;
}
