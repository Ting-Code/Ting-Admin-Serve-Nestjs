import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MaterialEntity } from "@libs/db/models/materials/material/material.entity";
import { MaterialDto } from "@libs/db/models/materials/material/material.dto";

@Injectable()
export class MaterialService {

  constructor(
    //引入数据库表示例赋值给articleRepository
    @InjectRepository(MaterialEntity)
    private readonly Repository: Repository<MaterialEntity>,

  ) {}
  //如查找数据
  async find(json:MaterialDto = {}){
    try {
      return await this.Repository.find(json);
    }catch (err){
      return err;
    }
  }

  async add(json: MaterialDto){
    try {
      await this.Repository.save(json);
      return [];
    } catch (error) {
      return null;
    }
  }

  async update(json1:MaterialDto,json2:MaterialDto){
    try {
      return  await this.Repository.update(json1,json2);

    } catch (error) {
      return null;
    }
  }

  async delete(json:MaterialDto){
    try {
      return await this.Repository.delete(json);
    } catch (error) {
      return null;
    }
  }

  async getModel() {
    return this.Repository;
  }

}
