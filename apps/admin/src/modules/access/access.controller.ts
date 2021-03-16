import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Response } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Config } from "../../config/config";
import { ToolsService } from "../../common/tools/tools.service";
import { AccessService } from "@libs/db/models/access/access.service";
import { AccessDto } from "@libs/db/models/access/access.dto";

@Controller(`${Config.adminPath}/access`)
@ApiTags('access权限表')
export class AccessController {

  constructor(private accessService: AccessService,
              private toolsService: ToolsService
  ) {
  }

  @Get()
  @ApiOperation({ summary: "权限列表", operationId: "list" })
  async index(@Response() res) {
    const data = await this.accessService.getModel()
    await this.toolsService.success(res, data[0])
  }

  @Get('module')
  async module(@Response() res){
    //获取模块列表
    const result = await this.accessService.find({ "module_id": 0 });
    await this.toolsService.success(res, result)
  }

  @Post()
  @ApiOperation({ summary: "增加权限"})
  async add(@Body() body:AccessDto, @Response() res) {
    try {
      await this.accessService.add(body);
      await this.toolsService.success(res)
    }catch (error){
      throw new BadRequestException({code:400,msg:"权限不能为空"})
    }
  }

  @Get(":id")
  @ApiOperation({ summary: "显示一条权限详情" })
  async read(@Param("id") id: number, @Response() res) {
    try {
      const data = await this.accessService.find({id: id});
      await this.toolsService.success(res, data)
    } catch (err) {
      await this.toolsService.error(res)
    }
  }

  @Put(":id")
  @ApiOperation({ summary: "修改权限信息"})
  async edit(@Param("id") id: number, @Body() body:AccessDto, @Response() res) {

    try{
      await this.accessService.update({ "id": id }, { ...body });
      await this.toolsService.success(res)
    }catch (err){
      await this.toolsService.error(res, "修改错误，请重新修改", err)
    }

  }

  @Delete(":id")
  @ApiOperation({ summary: "删除单条用户信息"})
  async delete(@Param("id") id: number, @Response() res) {
    try {
      await this.accessService.delete({ "id": id })
      await this.toolsService.success(res)
    } catch (err) {
      await this.toolsService.error(res)
    }
  }
}