import { Service, KnexServiceOptions } from 'feathers-knex';
import { Application } from '../../declarations';

export class Users extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<KnexServiceOptions>, app: Application) {
    super({
      ...options,
      name: 'users'
    });

    // CRUD - Create, Read, Update, Delete.

    /* {
      user_id: 
      email: 
      password_hash:
      allergener:

      create(userObject) {
        user_id = tildatabese.save(); 
        ...

      }

      findAll() {
        // admin hente ut en liste av brukere. 
      }

    } */


  }
}
