import { Publisher, Subjects, CompletedAddEvent } from '@tetsudoeki/common';

export class CompletedAddPublisher extends Publisher<CompletedAddEvent> {
  readonly subject = Subjects.CompletedAdd;
}
