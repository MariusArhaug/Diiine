import { Service, KnexServiceOptions } from 'feathers-knex';
import { Application } from '../../declarations';
import { Params, Id, ServiceMethods } from '@feathersjs/feathers';


// A type interface for our user (no valdiation) 
interface UserData {
  _id?: string,
  email: string,
  password: string,
  name: string,
  created_at: Date,
  updated_at: Date,
  allergenes: string
}


export class Users extends Service<UserData> {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<KnexServiceOptions>, app: Application) {
    super({
      ...options,
      name: 'users'
    });
  }

    async find(params: Params) {
      return [];
    };

    async update(id: Id, data: UserData, params: Params) {
      
      data.updated_at = new Date();
      
      return super.update(id, data, params);
    }

    async get(id: Id, params: Params) : Promise<any> {
      return {
        id, 
        text: 'get test'
      };
    };
  
    async create(data: UserData, params?: Params) {
      const { email, password, name } = data;
      const userData = {
        email,
        name,
        password
      };

      // Call original `create` method with existing params and new data.
      return super.create(userData, params);
    }
}
