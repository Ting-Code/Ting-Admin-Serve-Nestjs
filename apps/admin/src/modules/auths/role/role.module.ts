import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { ToolsService } from "../../../common/tools/tools.service";

@Module({
  controllers: [RoleController],
  providers: [ToolsService]
})
export class RoleModule {}
