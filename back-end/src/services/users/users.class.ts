import { Service, KnexServiceOptions } from 'feathers-knex';
import { Application } from '../../declarations';
import { Params, Id, ServiceMethods } from '@feathersjs/feathers';


// A type interface for our user (no valdiation) 
interface UserData {
  _id?: number,
  email: string,
  password: string,
  name: string,
  created_at: Date,
  updated_at: Date,
  allergenes: string,
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

  async create (data: UserData, params?: Params) {
    // This is the information we want from the user signup data
    const { email, password, name, isAdmin } = data;
    
    // The complete user
    const userData = {
      email,
      name,
      password,
      isAdmin,
    };

    // Call the original `create` method with existing `params` and new data
    return super.create(userData, params);
  }

}
