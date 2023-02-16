import { BaseHostingException } from './base-hosting.exception';

export class IncompleteHostingException extends BaseHostingException {
  constructor(message: string) {
    super(message);
    this.name = 'IncompleteHostingException';
  }
}
