import { Test, TestingModule } from '@nestjs/testing';
import { MatCateController } from './mat-cate.controller';

describe('MatCateController', () => {
  let controller: MatCateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatCateController],
    }).compile();

    controller = module.get<MatCateController>(MatCateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
