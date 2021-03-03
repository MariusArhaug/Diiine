import app from '../../src/app';

describe('\'attendingdinners\' service', () => {
  it('registered the service', () => {
    const service = app.service('attendingdinners');
    expect(service).toBeTruthy();
  });
});
