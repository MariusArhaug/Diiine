// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import app from "../app";
import { UserData } from '../services/users/users.class'
import { DinnerData } from '../services/dinners/dinners.class'
import { AttendingdinnersData } from '../services/attendingdinners/attendingdinners.class';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { user, query } = context.params;
    
    if (!query) {
      throw new Error('Error! ')
    }
    
    context.result.data = await Promise.all(context.result.data
      .map(async (dinners: DinnerData) => ({
        ...dinners,
        attendants: await Promise.resolve((app.service('attendingdinners')
            .find({query: {dinners_id : dinners.dinners_id}})
            .then(async (res: any) => await Promise.all(res.data
              .map((row: AttendingdinnersData) => (
                app.service('users')
                  .get(row.user_id)
                  .then((res: UserData) => res)
              ))
            ))
          )) 
      }))
    )
  
    return context;
  };
};
