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
import { MatTypeModule } from './modules/materials/mat-type/mat-type.module';
import { TypeTestModule } from './modules/materials/type-test/type-test.module';
import { MatCateModule } from './modules/materials/mat-cate/mat-cate.module';
import { ToolsController } from './common/tools/tools.controller';
import { TestModule } from './modules/materials/test/test.module';



@Module({
  imports: [AdminModule, LoginModule, RoleModule, AccessModule, AuthModule, MaterialModule, MatTypeModule, TypeTestModule, MatCateModule, TestModule],
  controllers: [AppController, ToolsController],
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
