import express, { Request, Response } from 'express';
import { body, param } from 'express-validator';
import { validateRequest, BadRequestError } from '@tetsudoeki/common';
import axios from 'axios';
import { Season } from '../models/seasonModel';

const router = express.Router();

router.get(
  '/api/discover/season/:name/:year',
  async (req: Request, res: Response) => {
    const season_name = req.params.name.toLowerCase();
    const season_year = parseInt(req.params.year);

    if (
      season_name === null ||
      (season_name !== 'winter' &&
        season_name !== 'spring' &&
        season_name !== 'fall' &&
        season_name !== 'summer')
    ) {
      throw new BadRequestError('invalid season_name');
    }
    const d = new Date();

    if (
      season_year === null ||
      season_year > d.getFullYear() ||
      season_year < 1000
    ) {
      throw new BadRequestError('invalid season_year');
    }

    const existingSeason = await Season.findOne({
      season_name: season_name,
      season_year: season_year,
    });

    if (!existingSeason) {
      const { data } = await axios.get(
        `https://api.jikan.moe/v3/season/${season_year}/${season_name}`
      );
      if (data.season_name === null || data.season_year === null) {
        throw new BadRequestError('unable to get season');
      }
      const season = Season.build({
        season_name: data.season_name.toLowerCase(),
        season_year: data.season_year,
        anime: data.anime,
      });
      await season.save();
      res.send(season);
    } else {
      res.send(existingSeason);
    }
  }
);

export { router as getSeasonRouter };
