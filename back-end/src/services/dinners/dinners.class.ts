import { Params } from '@feathersjs/feathers';
import { Service, KnexServiceOptions } from 'feathers-knex';
import { Application } from '../../declarations';

interface DinnerData {
 dinners_id: number,
 name: string,
 address: string,
<<<<<<< HEAD
 description: string,
 date: Date,
 ingredients: string,
 tags: string,
=======
 type: string,
>>>>>>> user-profile
 allergens: string,
 attendants: number,
 isDivided: boolean,
 isOpen: boolean,
 expenses: number,
<<<<<<< HEAD
=======
 date: Date,
>>>>>>> user-profile
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

<<<<<<< HEAD
  async create (data: DinnerData, params?: Params) { //DinenrData is the object that is being parsed from front-end
    const { 
      name,
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
      name,
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
=======
  async create (data: DinnerData, params?: Params) {
    const { name, address, type, allergens, attendants, date } = data;
    
    // set user_id to the incoming user
    const user_id = params?.user?.user_id;

    const dinnerData = {
      name,
      address,
      type,
      allergens,
      attendants,
      date,
      user_id
>>>>>>> user-profile
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
