// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import app from "../app";
import { UserData } from '../services/users/users.class'
import { DinnerData } from '../services/dinners/dinners.class'
import { AttendingdinnersData } from '../services/attendingdinners/attendingdinners.class';

async function findDinnersAttendants(dinners: DinnerData[]) {
  return Promise.all(dinners
    .map(async (dinner: DinnerData) => ({
      ...dinner,
      attendants: await getAttendants(dinner.dinners_id)
    }))
  )
}

async function getAttendants(id: number): Promise<UserData[]> {
  return await Promise.resolve((app.service('attendingdinners')
    .find({query: {dinners_id : id}})
    .then(async (res: any) => await Promise.all(res.data
      .map((row: AttendingdinnersData) => (
        app.service('users')
          .get(row.user_id)
          .then((res: UserData) => res)
      ))
    ))
  ))
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { user, query } = context.params;
    
    if (!query) {
      throw new Error('Error! ')
    }
    if (context.method === 'get') {
      console.log(context.result)
      context.result = {
        ...context.result,
        attendants: await getAttendants(context.result.dinners_id)
      }
      console.log(context.result)
    } 
    else {
      context.result.data = await findDinnersAttendants(context.result.data)
    }
    
    return context;
  };
};
