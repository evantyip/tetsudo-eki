export interface Season {
  season_name: string;
  season_year: number;
  anime: Anime[];
}

export type Anime = {
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
