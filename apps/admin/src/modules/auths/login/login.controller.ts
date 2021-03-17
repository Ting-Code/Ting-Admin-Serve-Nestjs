import { Controller, Get, Request, Response, Post, Body, UseGuards, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Config } from "../../../config/config";
import { ToolsService } from "../../../common/tools/tools.service";
import { AuthGuard } from "@nestjs/passport";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./login.dto";
import { Cuus } from "../../../common/decorators/cuus.decorators";
import { AdminInterface } from "@libs/db/models/admin/admin.interface";



@Controller(`${Config.adminPath}/login`)
@ApiTags('login')
export class LoginController {

  constructor(
    private jwtService: JwtService,
    private toolsService: ToolsService) { }

  @Get('code')
  @ApiOperation({ summary: "获取验证码" })
  async getCode(@Request() req, @Response() res) {
    let svgCaptcha = this.toolsService.getCaptcha();
    //设置session
    req.session.code = svgCaptcha.text;
    res.type('image/svg+xml');
    await this.toolsService.success(res, svgCaptcha.data)
  }

  @Post()
  @ApiOperation({ summary: "登录"})
  @UseGuards(AuthGuard('local'))
  async doLogin(@Body() body:LoginDto, @Request() req,@Response() res) {
    try {
      const code: string = body.code;
      if (code.toUpperCase() === req.session.code.toUpperCase() ) {
        req.session.userinfo=body.username;
        const token = this.jwtService.sign(body.username.toString())
        await this.toolsService.success(res, token)
        } else {
          await this.toolsService.error(res,  "验证码错误")
        }
    } catch (error) {
      await this.toolsService.error(res,"登录错误", error)
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
