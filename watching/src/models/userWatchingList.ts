import mongoose from 'mongoose';

interface UserWatchingListAttrs {
  userId: string;
  watchingAnime: {
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
  }[];
  // watchingAnimeSet: Set<string> | null;
}

interface UserWatchingListDoc extends mongoose.Document {
  userId: string;
  watchingAnime: {
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
  }[];
  // watchingAnimeSet: Set<string> | null;
}

interface UserWatchingListModel extends mongoose.Model<UserWatchingListDoc> {
  build(attrs: UserWatchingListAttrs): UserWatchingListDoc;
}

const userWatchingListSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    watchingAnime: [mongoose.Schema.Types.Mixed],
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

userWatchingListSchema.statics.build = (attrs: UserWatchingListAttrs) => {
  return new UserWatchingList(attrs);
};

const UserWatchingList = mongoose.model<
  UserWatchingListDoc,
  UserWatchingListModel
>('UserWatchingList', userWatchingListSchema);

export { UserWatchingList };
