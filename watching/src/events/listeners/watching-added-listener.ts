import { Listener, WatchingAddEvent, Subjects } from '@tetsudoeki/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';

export class WatchingAddedListener extends Listener<WatchingAddEvent> {
  subject: Subjects.WatchingAdd = Subjects.WatchingAdd;
  queueGroupName = queueGroupName;

  async onMessage(data: WatchingAddEvent['data'], msg: Message) {
    console.log('DATA RECEIVED');
    console.log(data);
    msg.ack();
  }
}
