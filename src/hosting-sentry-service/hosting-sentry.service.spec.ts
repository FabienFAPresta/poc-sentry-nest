import { Test, TestingModule } from '@nestjs/testing';
import { HostingSentryService } from './hosting-sentry.service';

describe('HostingSentryService', () => {
  let service: HostingSentryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HostingSentryService],
    }).compile();

    service = module.get<HostingSentryService>(HostingSentryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
