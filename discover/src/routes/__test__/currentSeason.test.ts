import request from 'supertest';
import { app } from '../../app';

it('returns a 200 on proper request', async () => {
  const res = await request(app)
    .get('/api/discover/season')
    .send({})
    .expect(200);

  const date = new Date();
  expect(res.body.season_year).toEqual(date.getFullYear().toString());
});
