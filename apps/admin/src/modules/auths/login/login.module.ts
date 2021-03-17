import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { AdminService } from "@libs/db/models/admin/admin.service";
import { PassportModule } from "@nestjs/passport";
import { DbModule } from "@libs/db";
import { LocalStrategy } from "./local.strategy";
import { ToolsService } from "../../../common/tools/tools.service";
import { CommonModule } from "@libs/common";
import { JwtStrategy } from "../../../common/guards/jwt.strategy";
import { AdminEntity } from "@libs/db/models/admin/admin.entity";


@Module({
  imports: [DbModule, PassportModule, CommonModule],
  controllers: [LoginController],
  providers: [AdminService, LocalStrategy, ToolsService, JwtStrategy, AdminEntity]
})
export class LoginModule {}
