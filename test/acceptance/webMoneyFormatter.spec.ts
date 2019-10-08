import supertest from 'supertest';
import server from '../../src/app/server';
import { Server } from 'http';

describe('Currency converter (via express)', () => {
  let server: Server;
  before(() => {
    server = app.listen(6543);
  });
  // tests here
  after(() => server.close());

  it('Should format a positive integer with two decimals', () => {
    const input = '1';
    const expected = '1.00';

    return request(server)
      .get(`/format/money/${input}`)
      .expect(200, expected);
  });

  it('Should format a positive floating point number, rounding to the nearest cent', () => {
    const input = '123.456';
    const expected = '123.46';

    return request(server)
      .get(`/format/money/${input}`)
      .expect(200, expected);
  });

  it('Should format a negative integer with two decimals', () => {
    const input = '-1';
    const expected = '-1.00';

    return request(server)
      .get(`/format/money/${input}`)
      .expect(200, expected);
  });

  it('Should format a negative floating point number, rounding to the nearest cent', () => {
    const input = '-123.456';
    const expected = '-123.46';

    return request(server)
      .get(`/format/money/${input}`)
      .expect(200, expected);
  });

  it('Should format multiple of 1000 in space separated groups of three digits', () => {
    const input = '12345678.456';
    const expected = '12 345 678.46';

    return request(server)
      .get(`/format/money/${input}`)
      .expect(200, expected);
  });
});
