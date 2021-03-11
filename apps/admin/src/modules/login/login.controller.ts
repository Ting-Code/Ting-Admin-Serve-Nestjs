import { Controller, Get, Render, Request, Response, Post, Body } from '@nestjs/common';
import { AdminService } from "@libs/db/models/admin/admin.service";
import { ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { Config } from "../../config/config";
import { Admin } from "@libs/db/models/admin/admin.entity";
import { ToolsService } from "../../common/tools/tools.service";
import * as jwt from "jsonwebtoken"


@Controller(`${Config.adminPath}/login`)
@ApiTags('login登录接口')
export class LoginController {

  constructor(private toolsService: ToolsService, private adminService: AdminService) { }

  @Get('code')
  @ApiOperation({ summary: "获取验证码"})
  getCode(@Request() req, @Response() res) {

    let svgCaptcha = this.toolsService.getCaptcha();
    //设置session
    req.session.code = svgCaptcha.text;
    res.type('image/svg+xml');
    res.send(svgCaptcha.data);
  }

  @Post()
  @ApiOperation({ summary: "登录"})
  async doLogin(@Body() body, @Request() req,@Response() res) {
    try {
      const code: string = body.code;
      const username: string = body.username;
      let password: string = body.password;
      if (username == "" || password.length < 3) {
        await this.toolsService.error({},"用户名或者密码不合法");
      } else {
        if (code.toUpperCase() == req.session.code.toUpperCase()) {
          password = this.toolsService.getMd5(password);
          let userResult = await this.adminService.find({ "username": username, "password": password });
          if (userResult.length > 0) {
            //生成token
            jwt.sign({username: body.username, password: body.password}, 'admin', {expiresIn: 60*60*24*7})
            console.log('登录成功');
            req.session.userinfo=userResult[0];
            await this.toolsService.success(body);
          } else {
            await this.toolsService.error(body, "登录错误");
          }
        } else {
          await this.toolsService.error(body,"验证码不正确");
        }
      }
    } catch (error) {
      console.log(error);
      await this.toolsService.error(body, error.toString());
    }
  }

  @Get('loginOut')
  loginOut(@Request() req,@Response() res){
    req.session.userinfo=null;
    res.redirect('/admin/login');
  }
}
