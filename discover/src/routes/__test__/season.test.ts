import request from 'supertest';
import { app } from '../../app';

it('returns a 400 on nothing provided in body', async () => {
  await request(app).get('/api/discover/season').send({}).expect(400);

  await request(app)
    .get('/api/discover/season')
    .send({
      season_name: 'WINTER',
    })
    .expect(400);

  await request(app)
    .get('/api/discover/season')
    .send({
      season_year: 2020,
    })
    .expect(400);
});

it('returns a 400 on invalid season_name and invalid season_year', async () => {
  await request(app)
    .get('/api/discover/season')
    .send({
      season_name: 'jdfjsdlafkjldf',
      season_year: 2018,
    })
    .expect(400);

  await request(app)
    .get('/api/discover/season')
    .send({
      season_name: 'WINTER',
      season_year: 2025,
    })
    .expect(400);

  await request(app)
    .get('/api/discover/season')
    .send({
      season_name: 'WINTER',
      season_year: -10,
    })
    .expect(400);
});

it('returns a 400 when jikan api cant get season/year', async () => {
  await request(app)
    .get('/api/discover/season')
    .send({
      season_name: 'winter',
      season_year: 1000,
    })
    .expect(400);
});

it('returns a 400 on nothing provided in body', async () => {
  await request(app)
    .get('/api/discover/season')
    .send({
      season_name: 'winter',
      season_year: 2018,
    })
    .expect(200);
});
