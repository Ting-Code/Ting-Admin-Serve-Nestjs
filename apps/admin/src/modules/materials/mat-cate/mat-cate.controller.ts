import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Response } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Config } from "../../../config/config";
import { ToolsService } from "../../../common/tools/tools.service";
import { MatCateService } from "@libs/db/models/materials/mat-cate/mat-cate.service";
import { MatCateDto } from "@libs/db/models/materials/mat-cate/mat-cate.dto";

@Controller(`${Config.adminPath}/matcate`)
@ApiTags('MatCate物料分类表')
export class MatCateController {

  constructor(private matCateService: MatCateService,
              private toolsService: ToolsService
  ) {
  }

  @Get()
  @ApiOperation({ summary: "物料分类列表" })
  async index(@Response() res) {
    const data = await this.matCateService.find()
    await this.toolsService.success(res, data)
  }

  @Post()
  @ApiOperation({ summary: "增加物料分类"})
  async save(@Body() body:MatCateDto, @Response() res) {
    const params = body

    if(body.pid === 0){
      params.pid_path = "0";
      params.pid_path_name = "";
      params.level = 0
    }else {
      const parent = await this.matCateService.find({ "pid": body.pid });
      if(parent[0] !== ""){
        params.pid_path = parent[0].pid_path.concat('_', `${body.pid}`);
        params.pid_path_name = parent[0].pid_path_name.concat('_', `${parent[0].cate_name}`);
        params.level = parent[0].level + 1;
      }else {
        await this.toolsService.error(res, "获取上级分类错误")
      }
    }
    try {
      await this.matCateService.add(params);
      await this.toolsService.success(res, params)
    }catch (error){
      throw new BadRequestException({code:400,msg:"增加物料分类错误"})
    }
  }

  @Get(":id")
  @ApiOperation({ summary: "显示一条权限详情" })
  async read(@Param("id") id: number, @Response() res) {
    try {
      const data = await this.matCateService.find({id: id});
      await this.toolsService.success(res, data)
    } catch (err) {
      await this.toolsService.error(res)
    }
  }

  @Put(":id")
  @ApiOperation({ summary: "修改权限信息"})
  async edit(@Param("id") id: number, @Body() body:MatCateDto, @Response() res) {
    try{
      await this.matCateService.update({ "id": id }, { ...body });
      await this.toolsService.success(res)
    }catch (err){
      await this.toolsService.error(res, "修改错误，请重新修改", err)
    }

  }

  @Delete(":id")
  @ApiOperation({ summary: "删除单条用户信息"})
  async delete(@Param("id") id: number, @Response() res) {
    try {
      await this.matCateService.delete({ "id": id })
      await this.toolsService.success(res)
    } catch (err) {
      await this.toolsService.error(res)
    }
  }
}