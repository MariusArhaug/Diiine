// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import app from '../app';
import { RatingData } from '../services/rating/rating.class'
import { UserData } from '../services/users/users.class';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { user, query } = context.params;

    if (!query) {
      throw new Error('Error!')
    }
    
    const userRated : UserData = await app.service('users').get(context.data.rated_of);
    
    let rows : any = await app.service('rating').find({
      query: {
        rated_of: context.data.rated_of
       }
     });
    if (rows.total === 0) {
      userRated.avg_rating = (userRated.avg_rating + context.data.avg_rating)/2
    } else {
      userRated.avg_rating = rows.data
      .map((obj: RatingData)  => obj.rating_value)
      .reduce((a : number, b : number) => a + b)/rows.data.length;
    }
    
    app.service('users')
      .patch(userRated.user_id, userRated)
      .catch((e: Error) => console.log(e));
    return context;
  };
};
