import { Listener, WatchingAddEvent, Subjects } from '@tetsudoeki/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { UserWatchingList } from '../../models/userWatchingList';

export class WatchingAddedListener extends Listener<WatchingAddEvent> {
  subject: Subjects.WatchingAdd = Subjects.WatchingAdd;
  queueGroupName = queueGroupName;

  async onMessage(data: WatchingAddEvent['data'], msg: Message) {
    const combine = { ...data.anime, user_started_watching: data.time };

    const watchingList = await UserWatchingList.findOne({
      userId: data.userId,
    });

    if (!watchingList) {
      let watchingAnime = [];
      watchingAnime.push(combine);
      const newWatchingList = UserWatchingList.build({
        userId: data.userId.toString(),
        watchingAnime,
      });
      await newWatchingList.save();
      // console.log('ONE');
    } else {
      let newWatchingAnime = watchingList.watchingAnime;
      // Check if anime has already been added?
      // Concurrceny problem
      if (!newWatchingAnime.find((el: any) => el.title == combine.title)) {
        newWatchingAnime.push(combine);
        watchingList.watchingAnime = newWatchingAnime;
        console.log('Need to check for concurrency(aka version the lists)');
      }

      await watchingList.save();
      // console.log('ELSE');
    }
    msg.ack();
  }
}
