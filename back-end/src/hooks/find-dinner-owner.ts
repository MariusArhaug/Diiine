// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import { DinnerData } from '../services/dinners/dinners.class';
import app from '../app';
 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {

    if (context.method === 'get') {
      context.result = {
        ...context.result,
        owner : await Promise.resolve(app.service('users').get(context.result.user_id))
      }
      return context;
    } 
    let dinnersArray = await Promise.all(context.result.data
      .map(async (dinners : DinnerData) => ({
        ...dinners,
        owner: await Promise.resolve(app.service('users').get(dinners.user_id))
      }))
    )
    context.result.data = dinnersArray.map((dinners: any) => {delete dinners.user_id; return dinners})
    
    return context;
  };
};
