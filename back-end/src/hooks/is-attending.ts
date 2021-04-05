// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import app from '../app';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { user, query } = context.params; 
    if(!query) {
      throw new Error('You must pass in a user_id and dinners_id');
    }
    
    let rows : any = await app.service('attendingdinners').find({
       query: {
         user_id : user?.user_id,
         dinners_id: context.data.dinners_id,
        }
      });
      
    if (await rows.total > 0) {
      throw new Error(`You cannot attend a dinner you're already attended to`);
    }
    return context;
  };
};
