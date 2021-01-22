import express, { Request, Response } from 'express';
import { body, param } from 'express-validator';
import {
  validateRequest,
  BadRequestError,
  requireAuth,
} from '@tetsudoeki/common';
import axios from 'axios';
import { Season } from '../models/seasonModel';
import { WatchingAddPublisher } from '../events/publishers/watching-add-publisher';
import { WatchingRemovePublisher } from '../events/publishers/watching-remove-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post(
  '/api/discover/watching/',
  requireAuth,
  [
    body('anime').not().isEmpty().withMessage('Anime is required'),
    body('time').not().isEmpty().withMessage('Time is required'),
    body('option').not().isEmpty().withMessage('Option required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { anime, time, option } = req.body;

    if (option === 'add') {
      new WatchingAddPublisher(natsWrapper.client).publish({
        userId: req.currentUser!.id,
        time: time,
        anime: anime,
      });
      res.status(200).send({});
    } else if (option === 'remove') {
      new WatchingRemovePublisher(natsWrapper.client).publish({
        userId: req.currentUser!.id,
        anime: anime,
      });
    } else {
      throw new BadRequestError('Something went wrong');
    }
  }
);

export { router as watchingRouter };
