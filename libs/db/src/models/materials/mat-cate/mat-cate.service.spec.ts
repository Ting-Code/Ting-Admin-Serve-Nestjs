import { Test, TestingModule } from '@nestjs/testing';
import { MatCateService } from './mat-cate.service';

describe('MatCateService', () => {
  let service: MatCateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatCateService],
    }).compile();

    service = module.get<MatCateService>(MatCateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
