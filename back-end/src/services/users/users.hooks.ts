import * as feathersAuthentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import parseObjectToString from '../../hooks/parse-object-to-string';
import isAdminOrSelfOwned from '../../hooks/is-admin-or-self-owned';
import isEmailUnique from '../../hooks/check-email'

// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = feathersAuthentication.hooks;
const { hashPassword, protect } = local.hooks;


export default {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [hashPassword('password'), parseObjectToString('allergies'), isEmailUnique()], 
    update: [ hashPassword('password'),  authenticate('jwt'), isAdminOrSelfOwned(), isEmailUnique() ],
    patch: [ hashPassword('password'),  authenticate('jwt'), isAdminOrSelfOwned(), isEmailUnique() ],
    remove: [authenticate('jwt'), isAdminOrSelfOwned()]
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
