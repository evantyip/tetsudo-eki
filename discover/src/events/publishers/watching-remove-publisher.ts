import { Publisher, Subjects, WatchingRemoveEvent } from '@tetsudoeki/common';

export class WatchingRemovePublisher extends Publisher<WatchingRemoveEvent> {
  readonly subject = Subjects.WatchingRemove;
}
