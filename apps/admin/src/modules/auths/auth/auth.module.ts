import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ToolsService } from "../../../common/tools/tools.service";
import { DbModule } from "@libs/db";

@Module({
  imports: [DbModule],
  controllers: [AuthController],
  providers: [ToolsService]
})
export class AuthModule {}
