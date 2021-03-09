import { Id, Params } from '@feathersjs/feathers';
import { Service, KnexServiceOptions } from 'feathers-knex';
import { Application } from '../../declarations';


/* Interface for ratings:
rated_of er mottaker at rating, rated_by er avsender
*/
interface RatingData {
  rated_of: number,
  rated_by: number,
  rating_value: number,
  description: string,
  created_at: Date,
  updated_at: Date,
  rating_id: number
}

export class Rating extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<KnexServiceOptions>, app: Application) {
    super({
      ...options,
      name: 'rating'
    });
  }

  async create(data: RatingData, params?: Params) {
    const {rated_of, rated_by, rating_value, description} = data;

    const ratingData = {
      rated_of,
      rated_by,
      rating_value,
      description,
      created_at: new Date(),
      updated_at: new Date()
    }

    return super.create(ratingData, params);
  }

  async find(params: Params) {

    /* params på formen:
    rated_of: 12
    */

    return super.find(params);
  }

  async update(id: Id, data: RatingData, params: Params) {
    
    data.updated_at = new Date();

    return super.update(id, data, params);
  }
}
