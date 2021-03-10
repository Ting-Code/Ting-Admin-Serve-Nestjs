import { Body, Controller, Get, Post, Query, Response } from "@nestjs/common";
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
 @ApiQuery({
  name: "查询用户列表",
  type: String,
  required: false,
  description: "不传值"
 })
 async index() {
  return {
   data: await this.adminService.find(),
  }
 }

 @Post('add')
 @ApiOperation({ summary: "增加用户", operationId: "list" })
 @ApiQuery({
  name: "增加用户",
  type: String,
  required: false,
  description: "传入用户信息option"
 })
 async add(@Body() body:Admin) {
  const result = await this.adminService.add(body);
  return {
   cateList: result,
   body
  };
 }

 @Get('read')
 @ApiOperation({ summary: "显示指导用户信息", operationId: "list" })
 @ApiQuery({
  name: "查询用户",
  type: String,
  required: false,
  description: "传值查询id用户"
 })
 async read(@Query() query) {
  try {
   return await this.adminService.find(query);
  } catch (err) {
   return err;
  }
 }

 @Post('edit')
 @ApiOperation({ summary: "修改用户信息", operationId: "list" })
 @ApiQuery({
  name: "修改用户",
  type: String,
  required: false,
  description: "传值更新的数据"
 })
 async edit(@Body() body, @Response() res) {
  let id = body._id;
  let password = body.password;

  if (password !== '') {
   if (password.length < 6) {
    // this.toolsService.error(res, '密码长度不合法', `/${Config.adminPath}/manager/edit?id=${id}`);
    return;
   } else {
    // password=this.toolsService.getMd5(password);
    await this.adminService.update({ "id": id }, {
    });
   }
  } else {
   await this.adminService.update({ "id": id }, { ...body });
  }
  res.send('')
 }

 @Get('delete')
 @ApiOperation({ summary: "删除单条用户信息", operationId: "delete" })
 @ApiQuery({
  name: "删除用户",
  type: String,
  required: false,
  description: "传值删除的用户id"
 })
 async delete(@Query() query) {
  try {
   let result = await this.adminService.delete({ "id": query.id });
   return '删除成功'
  } catch (err) {
   return err;
  }
 }
}