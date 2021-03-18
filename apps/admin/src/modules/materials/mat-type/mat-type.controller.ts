import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Response } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Config } from "../../../config/config";
import { ToolsService } from "../../../common/tools/tools.service";
import { MatTypeDto } from "@libs/db/models/materials/mat-type/mat-type.dto";
import { MatTypeService } from "@libs/db/models/materials/mat-type/mat-type.service";

@Controller(`${Config.adminPath}/mattype`)
@ApiTags('MatType商品类型表')
export class MatTypeController {

  constructor(private matTypeService: MatTypeService,
              private toolsService: ToolsService) {}

  @Get()
  @ApiOperation({ summary: "物料类型列表", operationId: "list" })
  async index(@Response() res) {
    const data = await this.matTypeService.find();
    await this.toolsService.success(res, data)
  }

  @Post()
  @ApiOperation({ summary: "增加物料类型"})
  async add(@Body() body:MatTypeDto, @Response() res) {
    try {
      await this.matTypeService.add(body);
      await this.toolsService.success(res)
    }catch (error){
      throw new BadRequestException({code:400,msg:"添加物料类型错误"})
    }
  }

  @Get(":id")
  @ApiOperation({ summary: "显示一个物料类型信息" })
  async read(@Param("id") id: number, @Response() res) {
    try {
      const data = await this.matTypeService.find({id: id});
      await this.toolsService.success(res, data)
    } catch (err) {
      await this.toolsService.error(res)
    }
  }

  @Put(":id")
  @ApiOperation({ summary: "修改物料类型信息"})
  async edit(@Param("id") id: number, @Body() body:MatTypeDto, @Response() res) {
    try{
      await this.matTypeService.update({ "id": id }, { ...body });
      await this.toolsService.success(res)
    }catch (err){
      await this.toolsService.error(res, "修改物料类型错误，请重新修改", err)
    }
  }

  @Delete(":id")
  @ApiOperation({ summary: "删除单条用户信息"})
  async delete(@Param("id") id: number, @Response() res) {
    try {
      await this.matTypeService.delete({ "id": id })
      await this.toolsService.success(res)
    } catch (err) {
      await this.toolsService.error(res)
    }
  }
}