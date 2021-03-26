// Initializes the `rating` service on path `/rating`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Rating } from './rating.class';
import createModel from '../../models/rating.model';
import hooks from './rating.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'rating': Rating & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    id: 'rating_id',
    multi: true,
  };

  // Initialize our service with any options it requires
  app.use('/rating', new Rating(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('rating');

  service.hooks(hooks);
}
