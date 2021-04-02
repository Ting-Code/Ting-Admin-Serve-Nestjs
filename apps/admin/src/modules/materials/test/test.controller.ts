import { BadRequestException, Controller, Get, Response } from "@nestjs/common";
import { Crud, CrudController } from "../../../common/decorators/crud.decorator";
import { TestService } from "@libs/db/models/materials/test/test.service";
import { TestDto } from "@libs/db/models/materials/test/test.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

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
