import { Module } from '@nestjs/common';
import { AccessController } from './access.controller';
import { DbModule } from "@libs/db";
import { ToolsService } from "../../common/tools/tools.service";
import { AccessService } from "@libs/db/models/access/access.service";

@Module({
  imports: [DbModule],
  controllers: [AccessController],
  providers: [ToolsService, AccessService]
})
export class AccessModule {}
