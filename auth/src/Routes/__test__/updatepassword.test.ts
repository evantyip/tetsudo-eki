import request from 'supertest';
import { app } from '../../app';

it('fails when an email that does not exist is supplied', async () => {
  await request(app)
    .post('/api/users/updatepassword')
    .set('Cookie', global.signin())
    .send({
      email: 'test@test.com',
      oldPassword: 'password',
      newPassword: '1234',
    })
    .expect(400);
});

it('fails when a different user tries change a password', async () => {
  const user = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  // console.log(user.get('Set-Cookie'));
  await request(app)
    .post('/api/users/updatepassword')
    .set('Cookie', global.signin())
    .send({
      email: 'test@test.com',
      password: 'asdfasdfasdfsdf',
    })
    .expect(400);
});

it('fails when insuffcient body parameters are provided', async () => {
  const user = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  // console.log(user.get('Set-Cookie'));
  await request(app)
    .post('/api/users/updatepassword')
    .set('Cookie', user.get('Set-Cookie'))
    .send({
      email: 'test@test.com',
      password: 'asdfasdfasdfsdf',
    })
    .expect(400);
});

it('succeeds when changing the password', async () => {
  const user = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  // console.log(user.get('Set-Cookie'));
  await request(app)
    .post('/api/users/updatepassword')
    .set('Cookie', user.get('Set-Cookie'))
    .send({
      email: 'test@test.com',
      oldPassword: 'password',
      newPassword: '1234',
    })
    .expect(200);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: '1234',
    })
    .expect(200);
});
