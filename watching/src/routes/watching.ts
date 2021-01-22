import express, { Request, Response } from 'express';
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from '@tetsudoeki/common';
import { UserWatchingList } from '../models/userWatchingList';

const router = express.Router();

type Anime = {
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
    const watchingList = await UserWatchingList.findOne({
      userId: req.params.id.toString(),
    });

    if (!watchingList) {
      throw new NotFoundError();
    }
    if (req.currentUser!.id !== req.params.id) {
      throw new NotAuthorizedError();
    }

    // can't send sets through JSON

    let animeMap: any = new Object();

    if (watchingList.watchingAnime) {
      watchingList.watchingAnime.forEach((element: Anime) => {
        animeMap[element.title] = true;
      });
    }
    // console.log(animeMap);

    res.send({
      UserWatchingList: watchingList,
      UserAnimeMap: animeMap,
    });
  }
);

export { router as watchingGetRouter };
