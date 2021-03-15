import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RoleEntity } from "@libs/db/models/role/role.entity";
import { RoleDto } from "@libs/db/models/role/role.dto";

@Injectable()
export class RoleService {

  constructor(
    //引入数据库表示例赋值给articleRepository
    @InjectRepository(RoleEntity)
    private readonly RoleRepository: Repository<RoleEntity>,

  ) {}
  //如查找数据
  async find(json:RoleDto = {}){
    try {
      return await this.RoleRepository.find(json);
    }catch (err){
      return err;
    }
  }

  async add(json: RoleDto){
    try {
      await this.RoleRepository.save(json);

      return [];
    } catch (error) {
      return error;
    }
  }

  async update(json1:RoleDto,json2:RoleDto){
    try {
      return await this.RoleRepository.update(json1,json2);
    } catch (error) {
      return error;
    }
  }

  async delete(json:RoleDto){
    try {
      return await this.RoleRepository.delete(json);
    } catch (error) {
      return error;
    }
  }

  getModel(){
    return this.RoleRepository;
  }

}
