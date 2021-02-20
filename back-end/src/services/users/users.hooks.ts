import * as feathersAuthentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import parseObjectToString from '../../hooks/parse-object-to-string';
import isAdminOrSelfOwned from '../../hooks/is-admin-or-self-owned';

// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = feathersAuthentication.hooks;
const { hashPassword, protect } = local.hooks;


export default {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
<<<<<<< HEAD
    create: [hashPassword('password'), parseObjectToString('allergies')], 
    update: [ hashPassword('password'),  authenticate('jwt'), isAdminOrSelfOwned() ],
    patch: [ hashPassword('password'),  authenticate('jwt'), isAdminOrSelfOwned() ],
    remove: [authenticate('jwt'), isAdminOrSelfOwned()]
=======
    create: [hashPassword('password'), parseObjectToString('allergies') ], 
    update: [ hashPassword('password'),  authenticate('jwt'), parseObjectToString('allergies') ],
    patch: [ hashPassword('password'),  authenticate('jwt'), parseObjectToString('allergies') ],
    remove: [ authenticate('jwt') ]
>>>>>>> 11-dinners-view
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
