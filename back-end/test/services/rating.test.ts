import app from '../../src/app';

describe('\'rating\' service', () => {
  it('registered the service', () => {
    const service = app.service('rating');
    expect(service).toBeTruthy();
  });
});
