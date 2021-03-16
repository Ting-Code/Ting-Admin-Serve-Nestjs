import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Response } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Config } from "../../config/config";
import { ToolsService } from "../../common/tools/tools.service";
import { AuthEntity } from "@libs/db/models/auth/auth.entity";
import { getConnection } from "typeorm";

@Controller(`${Config.adminPath}/auth`)
@ApiTags('角色授权')
export class AuthController {

  constructor(private toolsService: ToolsService) {}

  @Put(":id")
  @ApiOperation({ summary: "角色授权"})
  async edit(@Param("id") id: number, @Body() body, @Response() res) {
    const connection = getConnection(auth_);
    const queryRunner = connection.createQueryRunner();
    try{

      await this.toolsService.success(res)
    }catch (err){
      await this.toolsService.error(res, "修改错误，请重新修改", err)
    }
  }

}