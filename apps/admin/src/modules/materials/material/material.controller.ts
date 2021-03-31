import { Body, Controller, Delete, Get, Param, Post, Put, Query, Response } from "@nestjs/common";
import { ToolsService } from "../../../common/tools/tools.service";
import { Config } from "../../../config/config";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { MaterialService } from "@libs/db/models/materials/material/material.service";
import { MaterialDto } from "@libs/db/models/materials/material/material.dto";

@Controller(`${Config.adminPath}/material`)
@ApiTags('Material物料模块')
export class MaterialController {
  constructor(
    private materialService:MaterialService,
    private toolsService:ToolsService
  ){}

  @Get('audit/:id')
  @ApiOperation({ summary: "物料列表"})
  async index(@Response() res, @Param("id") id: number) {
    const data = await this.materialService.find({
      where: { is_conclusion: id},
      order: {
        id: 'DESC',
      }
    });
    await this.toolsService.success(res, data)
  }

  @Get()
  @ApiOperation({ summary: "物料过审分类列表"})
  async list(@Response() res, @Query() query) {
    const skip = (parseInt(query.page)-1)*10 || 0
    const keyword = query.keyword || ''
    const cate_id = parseInt(query.cate) || 0
    const [ data, total ]  = await this.materialService.getModule(skip, keyword, cate_id)
    await this.toolsService.success(res, { data, total })
  }

  @Post()
  @ApiOperation({ summary: "增加物料"})
  async add(@Body() body:{mat:MaterialDto, imgList, testList}, @Response() res) {
    const result = this.materialService.addMat(body)
    if(result){
      await this.toolsService.success(res)
    }else {
      await this.toolsService.error(res)
    }
  }

  @Get(":id")
  @ApiOperation({ summary: "显示一个物料信息" })
  async read(@Param("id") id: number, @Response() res) {
    try {
      const mat = await this.materialService.find({id: id});
      const testList = await this.materialService.findTest({mat_id: id});
      const imgList = await this.materialService.findImg({mat_id: id});
      const data = { mat, testList, imgList }
      await this.toolsService.success(res, data)
    } catch (err) {
      await this.toolsService.error(res)
    }
  }

  @Put(":id")
  @ApiOperation({ summary: "修改物料信息"})
  async edit(@Param("id") id: number, @Body() body:{mat: MaterialDto, testList}, @Response() res) {
    try{
      await this.materialService.update(id, body)
      await this.toolsService.success(res)
    }catch (err){
      await this.toolsService.error(res, "修改物料错误，请重新修改", err)
    }
  }

  @Put("audit/:id")
  @ApiOperation({ summary: "修改物料信息"})
  async audit(@Param("id") id: number, @Body() body:MaterialDto, @Response() res) {
    try{
      await this.materialService.updateAudit(id, body)
      await this.toolsService.success(res)
    }catch (err){
      await this.toolsService.error(res, "修改物料错误，请重新修改", err)
    }
  }

  @Delete(":id")
  @ApiOperation({ summary: "删除物料信息"})
  async delete(@Param("id") id: number, @Response() res) {
    try {
      await this.materialService.delete({ "id": id })
      await this.toolsService.success(res)
    } catch (err) {
      await this.toolsService.error(res)
    }
  }
}
