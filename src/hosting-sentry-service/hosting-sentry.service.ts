import { Injectable } from '@nestjs/common';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
import { BaseHostingException } from 'src/shared/exceptions/base-hosting.exception';

@Injectable()
export class HostingSentryService {
  constructor(@InjectSentry() private readonly sentry: SentryService) {}

  triggerSentryAlert(
    exception: BaseHostingException,
    user?: object,
    extraDatas?: object,
  ) {
    if (extraDatas) {
      Object.keys(extraDatas).forEach((key) => {
        this.sentry.instance().setExtra(key, extraDatas[key]);
      });
    }
    if (user) {
      this.sentry.instance().setUser(user);
    }
    this.sentry.instance().captureException(exception);
  }
}
