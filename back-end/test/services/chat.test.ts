import app from '../../src/app';

describe('\'chat\' service', () => {
  it('registered the service', () => {
    const service = app.service('chat');
    expect(service).toBeTruthy();
  });
});
