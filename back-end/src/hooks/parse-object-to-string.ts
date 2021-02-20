// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (field: string): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { data } = context;

    const result = Object.keys(data[field]).filter(key => data[field][key] === 1);
    context.data[field] = result.join();

    return context;
  };
};
