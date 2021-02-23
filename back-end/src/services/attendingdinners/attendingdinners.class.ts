import { Params } from '@feathersjs/feathers';
import { Service, KnexServiceOptions } from 'feathers-knex';
import { Application } from '../../declarations';

interface AttendingdinnersData {
  user_id: number,
  dinners_id: number
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
    const dinners_id = data.dinners_id;
    const user_id = params?.user?.user_id;

    const attendingdinnersdata = {
      user_id,
      dinners_id
    }

    return super.create(attendingdinnersdata, params);
  }
}
