import { Test, TestingModule } from '@nestjs/testing';
import { TypeTestController } from './type-test.controller';

describe('TypeTestController', () => {
  let controller: TypeTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeTestController],
    }).compile();

    controller = module.get<TypeTestController>(TypeTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
