// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import app from "../app";
import { UserData } from '../services/users/users.class'


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { query } = context.params;
 
    const row : any = await Promise.resolve(app.service('users').find({query: {email: context.data.email}}))
    if (row.total > 0) {
      throw new Error('A user with this email already exists!');
    }
    return context;
  };
};
