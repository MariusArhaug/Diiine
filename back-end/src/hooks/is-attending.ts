// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import app from '../app';

export type User = {
  user_id: number;
  name: string;
  address: string;
  email: string;
  isAdmin: boolean;
  allergies: string;
  avgRating: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { user, query } = context.params; 
    if(!query) throw new Error('You must pass in a user_id and dinners_id');
    let attendedUser : User;
    await app.service('attendingdinners')
    .find({ query: {user_id : {$in : [user?.user_id]} }})
    .then((res: any) => {
      attendedUser = res.data;
      if (user?.user_id === attendedUser?.user_id) throw new Error('You cant attend a dinner you already are attending.');
    });
    
    return context;
  };
};
