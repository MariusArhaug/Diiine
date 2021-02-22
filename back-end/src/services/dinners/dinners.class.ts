import { Params } from '@feathersjs/feathers';
import { Service, KnexServiceOptions } from 'feathers-knex';
import { Application } from '../../declarations';

interface DinnerData {
 dinners_id: number,
 name: string,
 adress: string,
 type: string,
 allergens: string,
 attendants: number,
 isDivided: boolean,
 isOpen: boolean,
 expenses: number,
 date: Date,
 user_id: number,
 banner: string
}

export class Dinners extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<KnexServiceOptions>, app: Application) {
    super({
      ...options,
      name: 'dinners'
    });
  }

  async create (data: DinnerData, params?: Params) {
    const { name, adress, type, allergens, attendants, date } = data;
    
    // set user_id to the incoming user
    const user_id = params?.user?.user_id;

    const dinnerData = {
      name,
      adress,
      type,
      allergens,
      attendants,
      date,
      user_id
    };

    return super.create(dinnerData, params);
  }

  async find (params: Params) {
    /* 
      params.query {
        date: {
          $gte: YYYY-MM-DD
        }
      }
      skal returnere middager fra og med dato.

      params.query {user_id}
      skal hente ut middager som har user_id
    */

    return super.find(params);
  }
}
