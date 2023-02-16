import { Module } from '@nestjs/common';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HostingSentryService } from './hosting-sentry-service/hosting-sentry.service';

@Module({
  imports: [
    SentryModule.forRoot({
      dsn: 'https://deedd8d426ad45c4a90e319788f03be5@o4504643290398720.ingest.sentry.io/4504643292561408',
      debug: true,
      environment: 'dev',
      release: process.env.npm_package_version,
      logLevels: ['error'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, HostingSentryService],
})
export class AppModule {}
