import { Module } from '@nestjs/common';
import { MatCateController } from './mat-cate.controller';
import { MatCateService } from "@libs/db/models/materials/mat-cate/mat-cate.service";
import { DbModule } from "@libs/db";
import { ToolsService } from "../../../common/tools/tools.service";

@Module({
  imports: [DbModule],
  controllers: [MatCateController],
  providers: [ToolsService, MatCateService]
})
export class MatCateModule {}
