import app from '../server';
import supertest from 'supertest';

describe('', () => {
  it('should return 200', async () => {
    const response = await supertest(app).get('/');
    expect(response.body.message).toBe('hello');
  });
});
