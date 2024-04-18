import { Test, TestingModule } from '@nestjs/testing';
import { DolyamiController } from './dolyami.controller';

describe('DolyamiController', () => {
  let controller: DolyamiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DolyamiController],
    }).compile();

    controller = module.get<DolyamiController>(DolyamiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
