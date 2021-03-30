// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import app from '../app';
import { RatingData } from '../services/rating/rating.class'
import { UserData } from '../services/users/users.class';

interface Rating extends Omit<RatingData, 'rated_of' | 'rated_by'>{
  rated_of : UserData;
  rated_by : UserData;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { user, query } = context.params;

    if (!query) {
      throw new Error('Error!')
    }

    context.result.data = await Promise.all(context.result.data
      .map(async (rating: RatingData) => ({
        ...rating,
        rated_of: await Promise.resolve(app.service('users').get(rating.rated_of)),
        rated_by: await Promise.resolve(app.service('users').get(rating.rated_by)),  
      })
    ))
    
    return context;
  };
};
