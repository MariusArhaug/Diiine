// Initializes the `attendingdinners` service on path `/attendingdinners`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Attendingdinners } from './attendingdinners.class';
import createModel from '../../models/attendingdinners.model';
import hooks from './attendingdinners.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'attendingdinners': Attendingdinners & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/attendingdinners', new Attendingdinners(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('attendingdinners');

  service.hooks(hooks);
}
