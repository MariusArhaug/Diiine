import * as authentication from '@feathersjs/authentication';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

/* const calculateAverage = async (context: HookContext) => {
  let ratings = await app.service('rating').find({
    paginate: false,
    query: {
      rated_of: context.data.rated_of
    }
  });
  ratings = Object.keys(ratings);
  for (let i = 0; i < ratings.length; i++) {
    console.log(ratings[i]);
  }
} */

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
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
