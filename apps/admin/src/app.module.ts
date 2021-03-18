import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './modules/auths/admin/admin.module';
import { AdminauthMiddleware } from "./common/middleware/adminauth.middleware";
import { Config } from "./config/config";
import { LoginModule } from './modules/auths/login/login.module';
import { ToolsService } from "./common/tools/tools.service";
import { RoleModule } from './modules/auths/role/role.module';
import { AccessModule } from './modules/auths/access/access.module';
import { AuthModule } from './modules/auths/auth/auth.module';
import { MaterialModule } from './modules/materials/material/material.module';



@Module({
  imports: [AdminModule, LoginModule, RoleModule, AccessModule, AuthModule, MaterialModule],
  controllers: [AppController],
  providers: [AppService, ToolsService],
  exports: [ToolsService]
})
//配置权限中间件
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminauthMiddleware)
      .forRoutes(`${Config.adminPath}/*`)//在admin下面生效
  }
}
