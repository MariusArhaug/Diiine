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
  allergens: string,
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
      const { email, password, name, allergens, isAdmin } = data;
      const userData = {
        email,
        password,
        name,
        allergens,
        isAdmin
      };
      // Call original `create` method with existing params and new data.
      return super.create(userData, params);
    }
}
