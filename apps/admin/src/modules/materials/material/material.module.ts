import { Module } from '@nestjs/common';
import { MaterialController } from './material.controller';
import { ToolsService } from "../../../common/tools/tools.service";
import { DbModule } from "@libs/db";
import { MaterialService } from "@libs/db/models/materials/material/material.service";

@Module({
  imports: [DbModule],
  controllers: [MaterialController],
  providers: [ToolsService, MaterialService]
})
export class MaterialModule {}
