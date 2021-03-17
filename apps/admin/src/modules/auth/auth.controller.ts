import { Body, Controller, Delete, Get, Param, Post, Put, Response } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Config } from "../../config/config";
import { ToolsService } from "../../common/tools/tools.service";
import { AuthService } from "@libs/db/models/auth/auth.service";

@Controller(`${Config.adminPath}/role/auth`)
@ApiTags('角色授权')
export class AuthController {

  constructor(private toolsService: ToolsService,
              private authService: AuthService) {}

  @Get(":id")
  @ApiOperation({ summary: "获取角色权限"})
  async get(@Param("id") id: number, @Response() res){
    const data = await this.authService.getAuth(id);
    let dataArr = [];
    for(let i=0; i<data.length; i++){
      dataArr.push(data[i].access_id)
    }
    await this.toolsService.success(res, dataArr);
  }

  @Put(":id")
  @ApiOperation({ summary: "角色授权"})
  async edit(@Param("id") id: number, @Body() body, @Response() res) {
    try{
      const back = await this.authService.upAuth(id, body);
      if(back){
        await this.toolsService.success(res)
      }else {
        await this.toolsService.error(res, "授权错误，请重新修改")
      }
    }catch (err){
      await this.toolsService.error(res, "授权错误，请重新修改", err)
    }
  }

}