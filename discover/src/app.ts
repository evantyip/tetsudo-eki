import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@tetsudoeki/common';
import { getSeasonRouter } from './routes/season';
import { getCurrentSeasonRouter } from './routes/currentSeason';
import { watchingRouter } from './routes/watching';
import { completedRouter } from './routes/completed';

//initialization
const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    // secure: false,
    // development
    secure: process.env.NODE_ENV !== 'test',
  })
);
//must be put after cookie session
app.use(currentUser);

// specific routes
app.use(getSeasonRouter);
app.use(getCurrentSeasonRouter);
app.use(watchingRouter);
app.use(completedRouter);

// anything that isn't a valid route
app.all('*', async (req, res) => {
  throw new NotFoundError();
});
// middlewares
app.use(errorHandler);

export { app };
