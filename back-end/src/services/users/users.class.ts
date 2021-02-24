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
<<<<<<< HEAD
  name: string,
=======
>>>>>>> user-profile
  email: string,
  password: string,
  created_at: Date,
  updated_at: Date,
<<<<<<< HEAD
=======
  allergies: string,
>>>>>>> user-profile
  isAdmin: boolean,
  allergies: string[],
  rating_id: number,
  chatted_to: number,
  avatar: string,
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
<<<<<<< HEAD
    const { email, password, name, allergies, isAdmin} = data;

    //Turn allergies into string
    console.log(allergies);
    //let allergiesString = allergies.join(', ');

=======
    const { email, password, name, allergies, isAdmin } = data;
>>>>>>> user-profile
    const userData = {
      email,
      password,
      name,
<<<<<<< HEAD
      created_at: new Date(),
      updated_at: new Date(),
      allergies,
      isAdmin,
=======
      allergies,
      isAdmin
>>>>>>> user-profile
    };
      // Call original `create` method with existing params and new data.
    return super.create(userData, params);
  }

  async find(params: Params) {

    /* params på formen:
    user_id: 12
    */

    return super.find(params);
  }
}
