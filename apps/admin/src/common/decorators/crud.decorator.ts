import { BadRequestException, Body, Delete, Get, Param, Post, Put, Response, SetMetadata } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { get } from 'lodash'
import { Repository } from "typeorm";
import { RoleDto } from "@libs/db/models/auths/role/role.dto";



export class CrudPlaceholderDto {
  fake?: string;
  [key: string]: any;
}

export class ToolsService {
  async success(res, data:any={}, msg:string="success", code:number=200 ){
    res.status(200);
    res.send({
      code,
      data,
      msg
    })
  }
  async error(res, msg:string|object="error", data:any={}, code:number=400){
    res.status(400);
    res.send({
      code,
      data,
      msg
    })
  }
}

export class CrudService {
  constructor(
    private readonly Repository: Repository<any>,
  ) { }

  async find(json:CrudPlaceholderDto = {}){
    try {
      return await this.Repository.find(json);
    }catch (err){
      return err;
    }
  }

  async add(json: CrudPlaceholderDto){
    try {
      return await this.Repository.save(json);
    } catch (error) {
      return error;
    }
  }

  async update(json1:CrudPlaceholderDto,json2:CrudPlaceholderDto){
    try {
      return await this.Repository.update(json1,json2);
    } catch (error) {
      return error;
    }
  }

  async delete(json:CrudPlaceholderDto){
    try {
      return await this.Repository.delete(json);
    } catch (error) {
      return error;
    }
  }

  getModel(){
    return this.Repository;
  }
}

export class CrudController {
  private service: CrudService
  private toolsService: ToolsService
  constructor(service?: CrudService,
              toolsService?: ToolsService) {
    this.service = service
    this.toolsService = toolsService
  }
  @Get()
  @ApiOperation({ summary: "角色列表", operationId: "list" })
  async index(@Response() res) {
    const data = await this.service.find();
    await this.toolsService.success(res, data)
  }

  @Post()
  @ApiOperation({ summary: "增加角色"})
  async add(@Body() body:RoleDto, @Response() res) {
    try {
      await this.service.add(body);
      await this.toolsService.success(res)
    }catch (error){
      throw new BadRequestException({code:400,msg:"添加角色错误"})
    }
  }

  @Get(":id")
  @ApiOperation({ summary: "显示一个角色信息" })
  async read(@Param("id") id: number, @Response() res) {
    try {
      const data = await this.service.find({id: id});
      await this.toolsService.success(res, data)
    } catch (err) {
      await this.toolsService.error(res)
    }
  }

  @Put(":id")
  @ApiOperation({ summary: "修改角色信息"})
  async edit(@Param("id") id: number, @Body() body:RoleDto, @Response() res) {
    try{
      await this.service.update({ "id": id }, { ...body });
      await this.toolsService.success(res)
    }catch (err){
      await this.toolsService.error(res, "修改角色错误，请重新修改", err)
    }
  }

  @Delete(":id")
  @ApiOperation({ summary: "删除单条用户信息"})
  async delete(@Param("id") id: number, @Response() res) {
    try {
      await this.service.delete({ "id": id })
      await this.toolsService.success(res)
    } catch (err) {
      await this.toolsService.error(res)
    }
  }

}

const methods = [
  "index",
  "add",
  "read",
  "edit",
  "delete"
]
function cloneDecorators(from, to) {
  Reflect.getMetadataKeys(from).forEach(key => {
    const value = Reflect.getMetadata(key, from)
    Reflect.defineMetadata(key, value, to)
  })
}
function clonePropDecorators(from, to, name) {
  Reflect.getMetadataKeys(from, name).forEach(key => {
    const value = Reflect.getMetadata(key, from, name)
    Reflect.defineMetadata(key, value, to, name)
  })
}

export const Crud = (options: { model: any }): ClassDecorator => (target) => {
  const controller = target.prototype;
  const crudController = new CrudController();
  methods.forEach(method => {
    controller[method] = (...args) => {
      return crudController[method].apply(this, args)
    }
    Object.defineProperty(controller[method], 'name', {
      value: method
    })

    // clone instance decorators
    cloneDecorators(crudController, controller)
    cloneDecorators(crudController[method], controller[method])
    // clone instance method decorators
    clonePropDecorators(crudController, controller, method)
    // clone class "method" decorators
    clonePropDecorators(CrudController, target, method)

    // get exists param types
    const types: [] = Reflect.getMetadata("design:paramtypes", controller, method)

    Reflect.decorate([
      // replace fake dto to real dto
      Reflect.metadata("design:paramtypes", types.map((v: any) => {
        if (get(v, 'name') === CrudPlaceholderDto.name) {
          return get(options, `routes.${method}.dto`, options.model)
        }
        return v
      })),
      ...get(options, `routes.${method}.decorators`, [])
    ], controller, method, Object.getOwnPropertyDescriptor(controller, method))
  })
  controller.index = crudController.index;
  controller.add = crudController.add;
  controller.read = crudController.read;
  controller.edit = crudController.edit;
  controller.delete = crudController.delete;
}