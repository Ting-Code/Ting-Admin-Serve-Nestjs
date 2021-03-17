import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from "@libs/db/models/auth/auth.service";

@Injectable()
export class AdminauthMiddleware implements NestMiddleware {
  constructor(private authService:AuthService) {
  }
  async use(req: any, res: any, next: () => void) {
    const userinfo = req.session.userinfo;

    if (userinfo) {
      //设置全局变量
      res.locals.userinfo = userinfo;
      const hasAuth = await this.authService.checkAuth(req);
      if (hasAuth) {
        next();
      } else {
        res.send({ code: 400, msg: '您没有权限访问当前地址' });
      }
    } else {
      //排除不需要做权限判断的页面
      if (req.baseUrl.split("/")[2] === `login`) {
        next();
      } else {
        res.send({ code: 400, msg: '请登录' });
      }
    }

  }
}
