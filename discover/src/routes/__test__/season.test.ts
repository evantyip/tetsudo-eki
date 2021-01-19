import request from 'supertest';
import { app } from '../../app';

it('returns a 400 on invalid season_name and invalid season_year', async () => {
  await request(app)
    .get('/api/discover/season/ajdfklsfdlkjsdf/2018')
    .send({
      season_name: 'jdfjsdlafkjldf',
      season_year: 2018,
    })
    .expect(400);

  await request(app)
    .get('/api/discover/season/winter/3025')
    .send({
      season_name: 'WINTER',
      season_year: 2025,
    })
    .expect(400);

  await request(app)
    .get('/api/discover/season/winter/-10')
    .send({})
    .expect(400);
});

it('returns a 400 when jikan api cant get season/year', async () => {
  await request(app)
    .get('/api/discover/season/winter/1000')
    .send({})
    .expect(400);
});

it('returns a 200 on proper request', async () => {
  await request(app)
    .get('/api/discover/season/winter/2018')
    .send({})
    .expect(200);
});
