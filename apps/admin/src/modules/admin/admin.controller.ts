import { Body, Controller, Delete, Get, Param, Post, Put, Query, Response } from "@nestjs/common";
import { AdminService } from "@libs/db/models/admin/admin.service";
import { ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { Config } from "../../config/config";
import { Admin } from "@libs/db/models/admin/admin.entity";

@Controller(`${Config.adminPath}/admin`)
 @ApiTags('admin控制器')
 export class AdminController {

 constructor(private adminService: AdminService) {
 }

 @Get()
 @ApiOperation({ summary: "用户列表", operationId: "list" })
 async index() {
  return {
   data: await this.adminService.find(),
  }
 }

 @Post()
 @ApiOperation({ summary: "增加用户"})
 async add(@Body() body:Admin) {
  const result = await this.adminService.add(body);
  return {
   cateList: result,
   body
  };
 }

 @Get(":id")
 @ApiOperation({ summary: "显示指导用户信息" })
 async read(@Param("id") id: string) {
  try {
   let uid = parseInt(id)
   return await this.adminService.find({id: uid});
  } catch (err) {
   return err;
  }
 }

 @Put(":id")
 @ApiOperation({ summary: "修改用户信息"})
 async edit(@Param("id") id: number, @Body() body:Admin) {
  // let uid = parseInt(id);
  let password = body.password;
  if (password !== '') {
   if (password.length < 6) {
    // this.toolsService.error(res, '密码长度不合法', `/${Config.adminPath}/manager/edit?id=${id}`);
    return;
   } else {
    // password=this.toolsService.getMd5(password);
    return await this.adminService.update({ "id": id }, { ...body });
   }
  } else {
   return await this.adminService.update({ "id": id }, { ...body });
  }
 }

 @Delete(":id")
 @ApiOperation({ summary: "删除单条用户信息"})
 async delete(@Param("id") id: string) {
  try {
   return await this.adminService.delete({ "id": parseInt(id) })
  } catch (err) {
   return err;
  }
 }
}