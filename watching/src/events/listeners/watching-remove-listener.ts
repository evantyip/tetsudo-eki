import {
  Listener,
  WatchingRemoveEvent,
  Subjects,
  BadRequestError,
} from '@tetsudoeki/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { UserWatchingList } from '../../models/userWatchingList';

export class WatchingRemoveListener extends Listener<WatchingRemoveEvent> {
  subject: Subjects.WatchingRemove = Subjects.WatchingRemove;
  queueGroupName = queueGroupName;

  async onMessage(data: WatchingRemoveEvent['data'], msg: Message) {
    const watchingList = await UserWatchingList.findOne({
      userId: data.userId,
    });

    if (!watchingList) {
      // this shouldn't happen
      throw new BadRequestError('No user watching list');
    } else {
      let newWatchingAnime = watchingList.watchingAnime.filter((anime: any) => {
        return anime.title != data.anime.title;
      });
      // Check if anime has already been added?
      // Concurrceny problem
      watchingList.watchingAnime = newWatchingAnime;
      console.log('Need to check for concurrency(aka version the lists)');

      await watchingList.save();
      // console.log('ELSE');
    }
    msg.ack();
  }
}
