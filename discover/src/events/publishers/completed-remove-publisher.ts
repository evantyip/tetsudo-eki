import { Publisher, Subjects, CompletedRemoveEvent } from '@tetsudoeki/common';

export class CompletedRemovePublisher extends Publisher<CompletedRemoveEvent> {
  readonly subject = Subjects.CompletedRemove;
}
