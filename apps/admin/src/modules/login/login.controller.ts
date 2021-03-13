import { Controller, Get, Request, Response, Post, Body, UseGuards, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Config } from "../../config/config";
import { ToolsService } from "../../common/tools/tools.service";
import { AuthGuard } from "@nestjs/passport";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./login.dto";
import { Cuus } from "../../common/decorators/cuus.decorators";
import { AdminInterface } from "@libs/db/models/admin/admin.interface";



@Controller(`${Config.adminPath}/login`)
@ApiTags('login')
export class LoginController {

  constructor(
    private jwtService: JwtService,
    private toolsService: ToolsService) { }

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
  @UseGuards(AuthGuard('local'))
  async doLogin(@Body() body:LoginDto, @Request() req,@Response() res) {
    try {
      const code: string = body.code;
      if (code.toUpperCase() === req.session.code.toUpperCase() ) {
        const token = this.jwtService.sign(body.username.toString())
          res.send({ data:token, msg: "登录成功", code: 200 })
        } else {
        res.send({ msg: "验证码错误", code: 400});
        }
    } catch (error) {
      res.send({ msg: "登录失败", code: 400});
    }
  }

  @Get('user')
  @ApiOperation({summary: "测试守卫获取数据"})
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async user(@Cuus() user: AdminInterface){
    return user
  }

}
