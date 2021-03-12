import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { AdminService } from "@libs/db/models/admin/admin.service";
import { PassportModule } from "@nestjs/passport";
import { DbModule } from "@libs/db";
import { LocalStrategy } from "./local.strategy";
// import { JwtModule } from "@nestjs/jwt";
import { CommonModule } from "@libs/common";
import { ToolsService } from "../../common/tools/tools.service";


@Module({
  imports: [DbModule, PassportModule, CommonModule],
  controllers: [LoginController],
  providers: [AdminService, LocalStrategy, ToolsService]
})
export class LoginModule {}
