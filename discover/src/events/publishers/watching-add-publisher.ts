import { Publisher, Subjects, WatchingAddEvent } from '@tetsudoeki/common';

export class WatchingAddPublisher extends Publisher<WatchingAddEvent> {
  readonly subject = Subjects.WatchingAdd;
}
