import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  BadRequestError,
  requireAuth,
} from '@tetsudoeki/common';
import { natsWrapper } from '../nats-wrapper';
import { CompletedAddPublisher } from '../events/publishers/completed-add-publisher';
import { CompletedRemovePublisher } from '../events/publishers/completed-remove-publisher';

const router = express.Router();

router.post(
  '/api/discover/completed/',
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
      new CompletedAddPublisher(natsWrapper.client).publish({
        userId: req.currentUser!.id,
        time: time,
        anime: anime,
      });
      res.status(200).send({});
    } else if (option === 'remove') {
      new CompletedRemovePublisher(natsWrapper.client).publish({
        userId: req.currentUser!.id,
        anime: anime,
      });
      res.status(200).send({});
    } else {
      throw new BadRequestError('Something went wrong');
    }
  }
);

export { router as completedRouter };
