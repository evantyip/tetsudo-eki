import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '../../common/index';

import { currentUserRouter } from './Routes/current-user';
import { signinRouter } from './Routes/signin';
import { signoutRouter } from './Routes/signout';
import { signupRouter } from './Routes/signup';

//initialization
const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    //secure: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);
// specific routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// anything that isn't a valid route
app.all('*', async (req, res) => {
  throw new NotFoundError();
});
// middlewares
app.use(errorHandler);

export { app };
