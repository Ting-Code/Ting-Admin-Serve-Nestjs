import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Response } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Config } from "../../../config/config";
import { ToolsService } from "../../../common/tools/tools.service";
import { TypeTestService } from "@libs/db/models/materials/type-test/type-test.service";
import { TypeTestDto } from "@libs/db/models/materials/type-test/type-test.dto";

@Controller(`${Config.adminPath}/typetest`)
@ApiTags('TypeTest物料测试类型项目表')
export class TypeTestController {

  constructor(private typeTestService: TypeTestService,
              private toolsService: ToolsService) {}

  @Get("type/:id")
  @ApiOperation({ summary: "测试项列表", operationId: "list" })
  async index(@Param("id") id: number, @Response() res) {
    const data = await this.typeTestService.find({type_id: id});
    await this.toolsService.success(res, data)
  }

  @Post()
  @ApiOperation({ summary: "增加物料类型"})
  async add(@Body() body:TypeTestDto, @Response() res) {
    try {
      await this.typeTestService.add(body);
      await this.toolsService.success(res)
    }catch (error){
      throw new BadRequestException({code:400,msg:"添加物料类型错误"})
    }
  }

  @Get(":id")
  @ApiOperation({ summary: "显示一个物料类型信息" })
  async read(@Param("id") id: number, @Response() res) {
    try {
      const data = await this.typeTestService.find({id: id});
      await this.toolsService.success(res, data)
    } catch (err) {
      await this.toolsService.error(res)
    }
  }

  @Put(":id")
  @ApiOperation({ summary: "修改物料类型信息"})
  async edit(@Param("id") id: number, @Body() body:TypeTestDto, @Response() res) {
    try{
      await this.typeTestService.update({ "id": id }, { ...body });
      await this.toolsService.success(res)
    }catch (err){
      await this.toolsService.error(res, "修改物料类型错误，请重新修改", err)
    }
  }

  @Delete(":id")
  @ApiOperation({ summary: "删除单条用户信息"})
  async delete(@Param("id") id: number, @Response() res) {
    try {
      await this.typeTestService.delete({ "id": id })
      await this.toolsService.success(res)
    } catch (err) {
      await this.toolsService.error(res)
    }
  }
}