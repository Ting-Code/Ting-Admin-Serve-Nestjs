import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Response } from "@nestjs/common";
import { AdminService } from "@libs/db/models/admin/admin.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Config } from "../../../config/config";
import { AdminDto } from "./admin.dto";
import { hashSync } from "bcryptjs";
import { ToolsService } from "../../../common/tools/tools.service";

@Controller(`${Config.adminPath}/auth`)
@ApiTags('admin控制器')
export class AdminController {

 constructor(private adminService: AdminService,
             private toolsService: ToolsService
             ) {
 }

 @Get()
 @ApiOperation({ summary: "用户列表", operationId: "list" })
 async index(@Response() res) {
   const data = await this.adminService.getModel()
   await this.toolsService.success(res, data)
 }

 @Post()
 @ApiOperation({ summary: "增加用户"})
 async add(@Body() body:AdminDto, @Response() res) {
  try {
   if(body.password !== '' || body.password.length>3){
      body.password = hashSync(body.password)
   }else {
    await this.toolsService.error(res, "密码格式错误")
   }
   const data = await this.adminService.find({username: body.username});
   if(data.length >= 1 || body.username === ""){
    await this.toolsService.error(res, "用户已存在或错误")
   }
   await this.adminService.add(body);
   await this.toolsService.success(res)
  }catch (error){
   throw new BadRequestException({code:400,msg:"密码不能为空"})
  }
 }

 @Get(":id")
 @ApiOperation({ summary: "显示个人用户信息" })
 async read(@Param("id") id: number, @Response() res) {
  try {
   const data = await this.adminService.find({id: id});
   await this.toolsService.success(res, data)
  } catch (err) {
   await this.toolsService.error(res)
  }
 }

 @Put(":id")
 @ApiOperation({ summary: "修改用户信息"})
 async edit(@Param("id") id: number, @Body() body:AdminDto, @Response() res) {
  let { password, nickname, number, branch, role_id, phone } = body;
  try{
   if (password !== '') {
    if (password.length < 3) {
     await this.toolsService.error(res, '密码长度不合法');
    } else {
     body.password = hashSync(body.password);//密码加密
     await this.adminService.update({ "id": id }, { ...body });
    }
   } else {
    await this.adminService.update({ "id": id }, { nickname, number, branch, role_id, phone });
   }
   await this.toolsService.success(res)
  }catch (err){
   await this.toolsService.error(res, "修改用户错误，请重新修改", err)
  }
 }

 @Delete(":id")
 @ApiOperation({ summary: "删除单条用户信息"})
 async delete(@Param("id") id: number, @Response() res) {
  try {
   await this.adminService.delete({ "id": id })
   await this.toolsService.success(res)
  } catch (err) {
   await this.toolsService.error(res)
  }
 }
}