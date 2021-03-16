import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { DbModule } from "@libs/db";
import { ToolsService } from "../../common/tools/tools.service";
import { AuthService } from "@libs/db/models/auth/auth.service";

@Module({
  imports: [DbModule],
  controllers: [AuthController],
  providers: [ToolsService, AuthService]
})
export class AuthModule {}
