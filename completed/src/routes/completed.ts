import express, { Request, Response } from 'express';
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from '@tetsudoeki/common';
import { UserCompletedList } from '../models/userCompletedList';
const router = express.Router();

type Anime = {
  user_completed_watching: Date;
  mal_id: string;
  url: string;
  title: string;
  image_url: string;
  synopsis: string;
  type: string;
  airing_start: string;
  episodes: number;
  members: number;
  genres: {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }[];
  source: string;
  producers: {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }[];
  score: number;
  licensors: string[];
  r18: boolean;
  kids: boolean;
  continuing: boolean;
};
router.get(
  '/api/completed/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    const completedList = await UserCompletedList.findOne({
      userId: req.params.id.toString(),
    });

    if (req.currentUser!.id !== req.params.id) {
      throw new BadRequestError('Not authorized');
    }

    if (!completedList) {
      let completedAnime: Anime[] = [];
      const newcompletedList = UserCompletedList.build({
        userId: req.currentUser!.id,
        completedAnime,
      });
      await newcompletedList.save();
      res.send(newcompletedList);
      // console.log('ONE');
      // throw new NotFoundError();
    } else {
      let animeMap: any = new Object();

      if (completedList.completedAnime) {
        completedList.completedAnime.forEach((element: Anime) => {
          animeMap[element.title] = true;
        });
      }
      // console.log(animeMap);

      res.send({
        UserCompletedList: completedList,
        UserCompletedAnimeMap: animeMap,
      });
    }
  }
);

export { router as completedGetRouter };
