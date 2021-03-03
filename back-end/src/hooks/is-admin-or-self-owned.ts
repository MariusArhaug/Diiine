// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { user, query } = context.params; 

    if(!query) {
      throw new Error('You must pass in a user_id')
    }
    if (!user?.isAdmin) {
      if (user?.user_id == query.user_id) {
        return context;
      }
      throw new Error('You must be an admin to do this.'); 
    }

    return context;
  };
};
