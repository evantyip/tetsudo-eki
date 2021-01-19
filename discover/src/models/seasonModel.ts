import mongoose from 'mongoose';

interface SeasonAttrs {
  season_name: string;
  season_year: number;
  anime: {
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
  }[];
}

interface SeasonDoc extends mongoose.Document {
  season_name: string;
  season_year: number;
  anime: {
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
  }[];
}

interface SeasonModel extends mongoose.Model<SeasonDoc> {
  build(attrs: SeasonAttrs): SeasonDoc;
}

const seasonSchema = new mongoose.Schema(
  {
    season_name: {
      type: String,
      required: true,
    },
    season_year: {
      type: String,
      required: true,
    },
    anime: [mongoose.Schema.Types.Mixed],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

seasonSchema.statics.build = (attrs: SeasonAttrs) => {
  return new Season(attrs);
};

const Season = mongoose.model<SeasonDoc, SeasonModel>('Season', seasonSchema);

export { Season };
