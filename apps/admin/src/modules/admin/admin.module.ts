import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from "@libs/db/models/admin/admin.service";
import { DbModule } from "@libs/db";
import { ToolsService } from "../../common/tools/tools.service";

@Module({
  imports: [DbModule],
  controllers: [AdminController],
  providers: [AdminService, ToolsService]
})
export class AdminModule {}
