import { Injectable } from "@nestjs/common";
import * as svgCaptcha from "svg-captcha";
import * as md5 from "md5";
//格式化日期
// import { format } from "silly-datetime";
import { extname, join } from "path";
import { Config } from "../../config/config";
//创建目录
import * as mkdirp from "mkdirp";
import { createWriteStream } from "fs";
const Jimp = require('jimp');


@Injectable()
export class ToolsService {
  getCaptcha(){
    return svgCaptcha.create({
      size: 2,
      fontSize: 50,
      width: 100,
      height: 40,
      background: "#cc9966"
    });
  }
  getMd5(str:string){
    return md5(str)
  }
  async success(data:any={}, msg:string="success", code:number=200 ){
      return {
        code,
        data,
        msg
      }
  }
  async error(data:any={},msg:string|object="error",code:number=400){
    return {
      code,
      data,
      msg
    }
  }

  //获取时间戳
  getTime(){
    let d=new Date();
    return d.getTime();
  }

  //创建上传路径
  // uploadFile(file) {
  //
  //   if (file) {
  //     // 1、获取当前日期   20191013
  //     let day = format(new Date(), 'YYYYMMDD');  //目录名称
  //     let d = this.getTime();  //时间戳  当前图片的名称
  //     // 2、根据日期创建目录
  //     let dir = join(__dirname, `../../../public/${Config.uploadDir}`, day);
  //     mkdirp.sync(dir);
  //     let uploadDir = join(dir, d + extname(file.originalname));
  //     // 3、实现上传
  //     const writeImage = createWriteStream(uploadDir);
  //     writeImage.write(file.buffer);
  //     // 4、返回图片保存的地址
  //     let saveDir = join(Config.uploadDir, day, d + extname(file.originalname));
  //     return {
  //       saveDir,
  //       uploadDir
  //     };
  //   }else{
  //     return {
  //       saveDir:'',
  //       uploadDir:""
  //     }
  //   }
  // }

  jimpImg(target){

    Jimp.read(target, (err, lenna) => {
      if (err) throw err;
      lenna
        .resize(200, 200) // resize
        .quality(90) // set JPEG quality
        // .greyscale() // set greyscale
        .write(target+"_200x200"+extname(target)); // save
    });

    Jimp.read(target, (err, lenna) => {
      if (err) throw err;
      lenna
        .resize(100, 100) // resize
        .quality(90) // 清晰度
        // .greyscale() // set greyscale
        .write(target+"_100x100"+extname(target)); // 写入文件
    });
  }
}
