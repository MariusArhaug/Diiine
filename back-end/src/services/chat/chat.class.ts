import { Id, Params } from '@feathersjs/feathers';
import { Service, KnexServiceOptions } from 'feathers-knex';
import { Application } from '../../declarations';
import { Users } from '../users/users.class';

interface ChatData {
  chat_id: number;
  chat_from: Users;
  chat_to: Users;
  message: string;
  timestamp: Date;
}

export class Chat extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<KnexServiceOptions>, app: Application) {
    super({
      ...options,
      name: 'chat'
    });
  }


}
