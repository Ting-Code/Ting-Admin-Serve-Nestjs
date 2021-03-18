import { Module } from '@nestjs/common';
import { MatTypeController } from './mat-type.controller';
import { ToolsService } from "../../../common/tools/tools.service";
import { DbModule } from "@libs/db";

@Module({
  imports: [DbModule],
  controllers: [MatTypeController],
  providers: [ToolsService],
})
export class MatTypeModule {}
