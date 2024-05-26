import { Test, TestingModule } from '@nestjs/testing';
import { DolyamiService } from './dolman';

describe('DolyamiService', () => {
  let service: DolyamiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DolyamiService],
    }).compile();

    service = module.get<DolyamiService>(DolyamiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
