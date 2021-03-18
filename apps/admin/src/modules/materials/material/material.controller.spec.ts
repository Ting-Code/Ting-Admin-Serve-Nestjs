import { Test, TestingModule } from '@nestjs/testing';
import { MaterialController } from './material.controller';

describe('MaterialController', () => {
  let controller: MaterialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaterialController],
    }).compile();

    controller = module.get<MaterialController>(MaterialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
