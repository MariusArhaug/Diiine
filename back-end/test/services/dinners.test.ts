import app from '../../src/app';

describe('\'dinners\' service', () => {
  it('registered the service', () => {
    const service = app.service('dinners');
    expect(service).toBeTruthy();
  });
});
