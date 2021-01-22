import {
  Listener,
  CompletedRemoveEvent,
  Subjects,
  BadRequestError,
} from '@tetsudoeki/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { UserCompletedList } from '../../models/userCompletedList';

export class CompletedRemoveListener extends Listener<CompletedRemoveEvent> {
  subject: Subjects.CompletedRemove = Subjects.CompletedRemove;
  queueGroupName = queueGroupName;

  async onMessage(data: CompletedRemoveEvent['data'], msg: Message) {
    const completedList = await UserCompletedList.findOne({
      userId: data.userId,
    });

    if (!completedList) {
      // this shouldn't happen
      throw new BadRequestError('No user completed list');
    } else {
      let newCompletedAnime = completedList.completedAnime.filter(
        (anime: any) => {
          return anime.title != data.anime.title;
        }
      );
      // Check if anime has already been added?
      // Concurrceny problem
      completedList.completedAnime = newCompletedAnime;
      console.log('Need to check for concurrency(aka version the lists)');

      await completedList.save();
      // console.log('ELSE');
    }
    msg.ack();
  }
}
