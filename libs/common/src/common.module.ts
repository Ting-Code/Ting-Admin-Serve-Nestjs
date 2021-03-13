import { Global, Module } from "@nestjs/common";
import { CommonService } from './common.service';
import { JwtModule } from "@nestjs/jwt";

@Global()
@Module({
  imports: [
    //利用环境变量取加密验证
    JwtModule.registerAsync({
      useFactory(){
        return {
          secret: "process.env.SECRET"
        }
      }
    })
  ],
  providers: [CommonService],
  exports: [CommonService, JwtModule],
})
export class CommonModule {}
