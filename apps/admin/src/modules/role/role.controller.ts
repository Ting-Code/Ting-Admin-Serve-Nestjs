import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Response } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { RoleService } from "@libs/db/models/role/role.service";
import { Config } from "../../config/config";
import { ToolsService } from "../../common/tools/tools.service";
import { RoleDto } from "@libs/db/models/role/role.dto";

@Controller(`${Config.adminPath}/role`)
@ApiTags('Role角色表')
export class RoleController {

  constructor(private roleService: RoleService,
              private toolsService: ToolsService) {}

  @Get()
  @ApiOperation({ summary: "角色列表", operationId: "list" })
  async index(@Response() res) {
    const data = await this.roleService.find();
    await this.toolsService.success(res, data)
  }

  @Post()
  @ApiOperation({ summary: "增加角色"})
  async add(@Body() body:RoleDto, @Response() res) {
    try {
      await this.roleService.add(body);
      await this.toolsService.success(res)
    }catch (error){
      throw new BadRequestException({code:400,msg:"添加角色错误"})
    }
  }

  @Get(":id")
  @ApiOperation({ summary: "显示一个角色信息" })
  async read(@Param("id") id: number, @Response() res) {
    try {
      const data = await this.roleService.find({id: id});
      await this.toolsService.success(res, data)
    } catch (err) {
      await this.toolsService.error(res)
    }
  }

  @Put(":id")
  @ApiOperation({ summary: "修改角色信息"})
  async edit(@Param("id") id: number, @Body() body:RoleDto, @Response() res) {
    try{
      await this.roleService.update({ "id": id }, { ...body });
      await this.toolsService.success(res)
    }catch (err){
      await this.toolsService.error(res, "修改错误，请重新修改", err)
    }
  }

  @Delete(":id")
  @ApiOperation({ summary: "删除单条用户信息"})
  async delete(@Param("id") id: number, @Response() res) {
    try {
      await this.roleService.delete({ "id": id })
      await this.toolsService.success(res)
    } catch (err) {
      await this.toolsService.error(res)
    }
  }
}