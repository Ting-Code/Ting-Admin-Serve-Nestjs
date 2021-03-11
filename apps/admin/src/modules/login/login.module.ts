import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { AdminService } from "@libs/db/models/admin/admin.service";
import { DbModule } from "@libs/db";


@Module({
  imports: [DbModule],
  controllers: [LoginController],
  providers: [AdminService]
})
export class LoginModule {}
