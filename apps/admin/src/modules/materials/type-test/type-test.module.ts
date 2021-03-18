import { Module } from '@nestjs/common';
import { TypeTestController } from './type-test.controller';
import { DbModule } from "@libs/db";
import { ToolsService } from "../../../common/tools/tools.service";

@Module({
  imports: [DbModule],
  controllers: [TypeTestController],
  providers: [ToolsService]
})
export class TypeTestModule {}
