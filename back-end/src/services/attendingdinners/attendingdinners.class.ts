import { Params } from '@feathersjs/feathers';
import { Service, KnexServiceOptions } from 'feathers-knex';
import { Application } from '../../declarations';

export interface AttendingdinnersData {
  user_id: number;
  dinners_id: number;
  seconday_pk: number;
}

export class Attendingdinners extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<KnexServiceOptions>, app: Application) {
    super({
      ...options,
      name: 'attendingdinners'
    });
  }

  // Sign up to given dinner_id with active user
  async create (data: AttendingdinnersData, params?: Params) {
    const { dinners_id} = data;
    const user_id = params?.user?.user_id;

    const attendingdinnersdata = {
      user_id,
      dinners_id
    }

    return super.create(attendingdinnersdata, params);
  }

  async find (params: Params) {
    return super.find(params);
  }

  /*

  TODO: 
  1. Restrict users from deleting entries
  This might be handled in front-end, users should only be able to delete themselves from the signup-table, unless they are
  the owner of the dinner or an admin.
  */
}
