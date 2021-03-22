import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MatTypeEntity } from "@libs/db/models/materials/mat-type/mat-type.entity";
import { MatTypeDto } from "@libs/db/models/materials/mat-type/mat-type.dto";

@Injectable()
export class MatTypeService {

  constructor(
    //引入数据库表示例赋值给articleRepository
    @InjectRepository(MatTypeEntity)
    private readonly Repository: Repository<MatTypeEntity>,

  ) {}
  //如查找数据
  async find(json:MatTypeDto = {}){
    try {
      return await this.Repository.find(json);
    }catch (err){
      return err;
    }
  }

  async add(json: MatTypeDto){
    try {
      await this.Repository.save(json);

      return [];
    } catch (error) {
      return null;
    }
  }

  async update(json1:MatTypeDto,json2:MatTypeDto){
    try {
      return  await this.Repository.update(json1,json2);

    } catch (error) {
      return null;
    }
  }

  async delete(json:MatTypeDto){
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
