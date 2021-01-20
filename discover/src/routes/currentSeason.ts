import express, { Request, Response } from 'express';
import { BadRequestError } from '@tetsudoeki/common';
import axios from 'axios';
import { Season } from '../models/seasonModel';

const router = express.Router();

router.get('/api/discover/season', async (req: Request, res: Response) => {
  const date = new Date();
  const month = date.getMonth() + 1;

  let season = '';

  switch (month) {
    case 12:
    case 1:
    case 2:
      season = 'winter';
      break;
    case 3:
    case 4:
    case 5:
      season = 'spring';
      break;
    case 6:
    case 7:
    case 8:
      season = 'summer';
      break;
    case 9:
    case 10:
    case 11:
      season = 'fall';
      break;
  }

  const season_name = season;

  // IMPORTANT !!!!!!!!!
  // TEMPORARY BECAUSE JIKAN IS DOWN RN
  const season_year = date.getFullYear() - 1;

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
});

export { router as getCurrentSeasonRouter };
