import express, { Request, Response } from 'express';
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from '@tetsudoeki/common';
import { UserWatchingList } from '../models/userWatchingList';

const router = express.Router();

type Anime = {
  user_started_watching: Date;
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
  '/api/watching/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    if (req.currentUser!.id !== req.params.id) {
      throw new BadRequestError('Not authorized');
    }

    const watchingList = await UserWatchingList.findOne({
      userId: req.params.id.toString(),
    });

    if (!watchingList) {
      let watchingAnime: Anime[] = [];
      const newWatchingList = UserWatchingList.build({
        userId: req.currentUser!.id,
        watchingAnime,
      });
      await newWatchingList.save();
      res.send(newWatchingList);
      // throw new NotFoundError();
    } else {
      let animeMap: any = new Object();

      if (watchingList.watchingAnime) {
        watchingList.watchingAnime.forEach((element: Anime) => {
          animeMap[element.title] = true;
        });
      }
      // console.log(animeMap);

      res.send({
        UserWatchingList: watchingList,
        UserWatchingAnimeMap: animeMap,
      });
    }
  }
);

export { router as watchingGetRouter };
