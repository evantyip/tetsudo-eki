import mongoose from 'mongoose';

interface UserCompletedListAttrs {
  userId: string;
  completedAnime: {
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
  }[];
  // watchingAnimeSet: Set<string> | null;
}

interface UserCompletedListDoc extends mongoose.Document {
  userId: string;
  completedAnime: {
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
  }[];
  // watchingAnimeSet: Set<string> | null;
}

interface UserCompletedListModel extends mongoose.Model<UserCompletedListDoc> {
  build(attrs: UserCompletedListAttrs): UserCompletedListDoc;
}

const userCompletedListSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    completedAnime: [mongoose.Schema.Types.Mixed],
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

userCompletedListSchema.statics.build = (attrs: UserCompletedListAttrs) => {
  return new UserCompletedList(attrs);
};

const UserCompletedList = mongoose.model<
  UserCompletedListDoc,
  UserCompletedListModel
>('UserCompletedList', userCompletedListSchema);

export { UserCompletedList };
