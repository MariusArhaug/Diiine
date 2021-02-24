// Initializes the `dinners` service on path `/dinners`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Dinners } from './dinners.class';
import createModel from '../../models/dinners.model';
import hooks from './dinners.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'dinners': Dinners & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    id: 'dinners_id',
    multi: true
  };

  // Initialize our service with any options it requires
  app.use('/dinners', new Dinners(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('dinners');

  service.hooks(hooks);
}
