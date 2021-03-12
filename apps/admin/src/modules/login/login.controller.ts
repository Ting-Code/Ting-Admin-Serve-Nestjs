import { Controller, Get, Request, Response, Post, Body, UseGuards } from "@nestjs/common";
import { AdminService } from "@libs/db/models/admin/admin.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Config } from "../../config/config";
import { ToolsService } from "../../common/tools/tools.service";
import { AuthGuard } from "@nestjs/passport";
import { JwtService } from "@nestjs/jwt";


@Controller(`${Config.adminPath}/login`)
@ApiTags('login')
export class LoginController {

  constructor(
    private jwtService: JwtService,
    private toolsService: ToolsService, private adminService: AdminService) { }

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
  async doLogin(@Body() body, @Request() req,@Response() res) {
    try {
      const code: string = body.code;
        if (code.toUpperCase() == req.session.code.toUpperCase()) {
          const token = this.jwtService.sign(body.username.toString())
          await this.toolsService.success(body);
        } else {
          await this.toolsService.error(body,"验证码不正确");
        }
    } catch (error) {
      console.log(error);
      await this.toolsService.error(body, error.toString());
    }
  }


}
