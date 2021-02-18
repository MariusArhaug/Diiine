import * as feathersAuthentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import { HookContext } from '@feathersjs/feathers';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = feathersAuthentication.hooks;
const { hashPassword, protect } = local.hooks;
const allergensString = async (context: HookContext) => {
  let result: string = "";
  Object.keys(JSON.parse(context.data.allergens)).forEach(function(key, state) {
    if(state==1){
      result+=","+key;
    }
  });
  context.data.allergens = result;
  return context;
};

export default {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [ hashPassword('password'), allergensString ], 
    update: [ hashPassword('password'),  authenticate('jwt'), allergensString ],
    patch: [ hashPassword('password'),  authenticate('jwt'), allergensString ],
    remove: [ authenticate('jwt') ]
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
