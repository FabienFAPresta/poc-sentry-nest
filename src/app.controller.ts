import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
import { AppService } from './app.service';
import { HostingSentryService } from './hosting-sentry-service/hosting-sentry.service';
import { IncompleteHostingException } from './shared/exceptions/incomplete-hosting.exception';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectSentry() private readonly sentryClient: SentryService,
    private readonly hostingSentryService: HostingSentryService,
  ) {}

  @Get()
  getHello(): string {
    const e = new IncompleteHostingException(
      `Incomplete job for the following hostings`,
    );
    const datas = {
      instances: ['Instance 1', 'Instance 2', 'Instance 3', 'Instance 4'],
      date: Date.now(),
    };
    this.hostingSentryService.triggerSentryAlert(e, null, datas);
    return this.appService.getHello();
  }

  @Get('/message')
  getMessage(): string {
    this.sentryClient.instance().captureMessage('This is a message');
    return 'ok';
  }

  @Get('/demo')
  getDemo(): string {
    const err = 'This is an example exception';
    const stack = ['Error step 1', 'Error step 2', 'Error step 3'];
    this.sentryClient.instance().captureException({ error: err, stack });
    return 'ok';
  }

  @Get('/basic')
  getBasic(): string {
    //const e = new NotFoundException('Item not found');
    const domain = 'titi.com';
    const stack = ['Error step 1', 'Error step 2', 'Error step 3'];
    const e = new InternalServerErrorException(`Shop ${domain} not associated`);
    this.sentryClient.instance().setExtra('stack', stack);
    this.sentryClient.instance().setUser({ email: 'my.email@your.domain.com' });
    this.sentryClient.instance().captureException(e);
    return 'ok';
  }
}
