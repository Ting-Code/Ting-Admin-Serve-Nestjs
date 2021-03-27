import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ToolsService } from "./tools.service";
import { Config } from "../../config/config";
import { ApiTags } from "@nestjs/swagger";

@Controller(`${Config.adminPath}/tools`)
export class ToolsController {

  constructor(private toolsService:ToolsService){}

  //富文本编辑器上传图片  图库上传图片
  @Post(`/upload`)
  @ApiTags('上传图片接口')
  @UseInterceptors(FileInterceptor('file'))
  async doUpload(@UploadedFile() file) {
    let { saveDir, uploadDir } = await this.toolsService.uploadFile(file);
    //缩略图
    if (uploadDir) {
      this.toolsService.jimpImg(uploadDir);
    }
    return { link: '/' + saveDir };
  }

}
