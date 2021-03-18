import { Test, TestingModule } from '@nestjs/testing';
import { TypeTestService } from './type-test.service';

describe('TypeTestService', () => {
  let service: TypeTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeTestService],
    }).compile();

    service = module.get<TypeTestService>(TypeTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
