import { Params } from '@feathersjs/feathers';
import { Service, KnexServiceOptions } from 'feathers-knex';
import { Application } from '../../declarations';

export interface DinnerData {
 dinners_id: number,
 title: string,
 address: string,
 description: string,
 date: Date,
 ingredients: string,
 tags: string,
 allergens: string,
 attendants: number,
 isDivided: boolean,
 isOpen: boolean,
 expenses: number,
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

  async create (data: DinnerData, params?: Params) { //DinenrData is the object that is being parsed from front-end
    const { 
      title,
      address, 
      description, 
      date, 
      tags,
      ingredients,
      allergens, 
      attendants, 
      isDivided, 
      isOpen,
      expenses, 
      banner
    } = data;
    
    // set user_id to the incoming user

    //change from array into string
    const user_id = params?.user?.user_id;


    const dinnerData = {
      title,
      address,
      description,
      date,
      tags,
      ingredients,
      allergens,
      attendants,
      isDivided,
      isOpen,
      expenses,
      user_id,
      banner
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
