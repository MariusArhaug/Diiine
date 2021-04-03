import { Service, KnexServiceOptions } from 'feathers-knex';
import { Application } from '../../declarations';
import { Params, Id, ServiceMethods } from '@feathersjs/feathers';


export interface UserData {
  user_id: number,
  name: string,
  email: string,
  password: string,
  created_at: Date,
  updated_at: Date,
  isAdmin: boolean,
  allergies: string,
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
    const { email, password, name, allergies, isAdmin, avatar, chatted_to} = data;

    //Turn allergies into string
    console.log(allergies);
    //let allergiesString = allergies.join(', ');

    const userData = {
      email,
      password,
      name,
      created_at: new Date(),
      updated_at: new Date(),
      allergies,
      isAdmin,
      avatar,
      chatted_to
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
