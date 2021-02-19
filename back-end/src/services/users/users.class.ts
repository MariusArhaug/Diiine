import { Service, KnexServiceOptions } from 'feathers-knex';
import { Application } from '../../declarations';
import { Params, Id, ServiceMethods } from '@feathersjs/feathers';
import app from '../../app';

/*
  Incoming user object
  {
    name: string,
    email: string,
    password: string,
    isAdmin: boolean,
    allergies: [
      {
        "gluten": 0,
        "nuts": 1
      }
    ]
  }
*/


// A type interface for our user (no valdiation) 
interface UserData {
  user_id: number,
  email: string,
  password: string,
  name: string,
  created_at: Date,
  updated_at: Date,
  allergies: string,
  isAdmin: boolean,
}


export class Users extends Service<UserData> {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<KnexServiceOptions>, app: Application) {
    super({
      ...options,
      name: 'users'
    });
  }
  async update(id: Id, data: UserData, params: Params) {
      
    data.updated_at = new Date();
      
    return super.update(id, data, params);
  }
  
  async create(data: UserData, params?: Params) {
    const { email, password, name, allergies, isAdmin } = data;
    const userData = {
      email,
      password,
      name,
      allergies,
      isAdmin
    };
      // Call original `create` method with existing params and new data.
    return super.create(userData, params);
  }

  async find(params: Params) {

    this.knex.select('dinner_id').from('hasDinners').where('user_id', params.user);

    /* params på formen:
    user_id: 12
    */

    return super.find(params);
  }
}
