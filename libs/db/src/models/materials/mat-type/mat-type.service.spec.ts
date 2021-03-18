import { Test, TestingModule } from '@nestjs/testing';
import { MatTypeService } from './mat-type.service';

describe('MatTypeService', () => {
  let service: MatTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatTypeService],
    }).compile();

    service = module.get<MatTypeService>(MatTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
