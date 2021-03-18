import { Module } from '@nestjs/common';
import { MaterialController } from './material.controller';
import { ToolsService } from "../../../common/tools/tools.service";

@Module({
  controllers: [MaterialController],
  providers: [ToolsService]
})
export class MaterialModule {}
