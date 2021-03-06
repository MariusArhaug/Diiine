import * as authentication from '@feathersjs/authentication';
import averageRating from '../../hooks/average-rating';
import changeRatingFields from '../../hooks/change-rating-fields';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [averageRating()],
    update: [averageRating()],
    patch: [averageRating()],
    remove: [averageRating()]
  },

  after: {
    all: [],
    find: [changeRatingFields()],
    get: [changeRatingFields()],
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
