import { Listener, CompletedAddEvent, Subjects } from '@tetsudoeki/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { UserCompletedList } from '../../models/userCompletedList';

export class CompletedAddListener extends Listener<CompletedAddEvent> {
  subject: Subjects.CompletedAdd = Subjects.CompletedAdd;
  queueGroupName = queueGroupName;

  async onMessage(data: CompletedAddEvent['data'], msg: Message) {
    const combine = { ...data.anime, user_completed_watching: data.time };

    const completedList = await UserCompletedList.findOne({
      userId: data.userId,
    });

    if (!completedList) {
      let completedAnime = [];
      completedAnime.push(combine);
      const newcompletedList = UserCompletedList.build({
        userId: data.userId.toString(),
        completedAnime,
      });
      // console.log(newcompletedList);
      await newcompletedList.save();
      // console.log('ONE');
    } else {
      let newCompletedAnime = completedList.completedAnime;
      // Check if anime has already been added?
      // Concurrceny problem
      if (!newCompletedAnime.find((el: any) => el.title == combine.title)) {
        newCompletedAnime.push(combine);
        completedList.watchingAnime = newCompletedAnime;
        console.log('Need to check for concurrency(aka version the lists)');
      }
      // console.log(completedList);

      await completedList.save();
      // console.log('ELSE');
    }
    msg.ack();
  }
}
