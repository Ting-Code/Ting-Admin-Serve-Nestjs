import { Test, TestingModule } from '@nestjs/testing';
import { MatTypeController } from './mat-type.controller';

describe('MatTypeController', () => {
  let controller: MatTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatTypeController],
    }).compile();

    controller = module.get<MatTypeController>(MatTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
