import * as authentication from '@feathersjs/authentication';
import findAttendants from '../../hooks/find-attendants';
import parseObjectToString from '../../hooks/parse-object-to-string';
import { combine } from 'feathers-hooks-common';
import findOwner from '../../hooks/find-dinner-owner';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate('jwt')],
    update: [],
    patch: [],
    // create: [authenticate('jwt'), parseObjectToString('allergens') ],
    // update: [ parseObjectToString('allergens') ],
    // patch: [ parseObjectToString('allergens') ],
    remove: []
  },

  after: {
    all: [],
    find: [combine(findAttendants(), findOwner())],
    get: [combine(findAttendants(), findOwner())],
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
