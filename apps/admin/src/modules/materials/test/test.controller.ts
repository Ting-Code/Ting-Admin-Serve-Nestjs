import { Controller } from "@nestjs/common";
import { TestService } from "@libs/db/models/materials/test/test.service";
import { TestDto } from "@libs/db/models/materials/test/test.dto";
import { ApiTags } from "@nestjs/swagger";
import { CrudController, Crud } from 'nestjs-tyoeorm-crud'

@Controller('test')
@Crud({model: TestService, dto:TestDto})
@ApiTags("测试CRUD")
export class TestController extends CrudController{
  constructor(
    private readonly testService: TestService
  ) {
    super(testService);
  }
}
