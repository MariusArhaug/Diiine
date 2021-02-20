import * as authentication from '@feathersjs/authentication';
import parseObjectToString from '../../hooks/parse-object-to-string';
import setUserIdOnDinner from '../../hooks/set-user-id-on-dinner';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [parseObjectToString('allergens') ],
    update: [ parseObjectToString('allergens') ],
    patch: [ parseObjectToString('allergens') ],
    remove: []
  },

  after: {
    all: [],
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
