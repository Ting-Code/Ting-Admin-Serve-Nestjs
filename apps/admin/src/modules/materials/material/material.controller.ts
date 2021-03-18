import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ToolsService } from "../../../common/tools/tools.service";
import { Config } from "../../../config/config";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { join } from "path";
import { MatTypeDto } from "@libs/db/models/materials/mat-type/mat-type.dto";

@Controller(`${Config.adminPath}/material`)
@ApiTags('material物料模块')
export class MaterialController {
  constructor(private toolsService:ToolsService){}

  @Get()
  @ApiOperation({ summary: "物料列表"})
  index(){

    return {}
  }

  @Post('doAdd')
  @ApiOperation({ summary: "物料列表"})
  @UseInterceptors(FileInterceptor('focus_img'))//文件名称
  doAdd(@Body() body, @UploadedFile() file){
    console.log(body);
    console.log(file);
    let saveDir=this.toolsService.uploadFile(file);//封装上传方法返回路径
    console.log(saveDir);
    return saveDir;//返回路径
  }
}
