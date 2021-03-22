import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { getConnection, Repository } from "typeorm";
import { MatCateEntity } from "@libs/db/models/materials/mat-cate/mat-cate.entity";
import { MatCateDto } from "@libs/db/models/materials/mat-cate/mat-cate.dto";

@Injectable()
export class MatCateService {

  constructor(
    //引入数据库表示例赋值给articleRepository
    @InjectRepository(MatCateEntity)
    private readonly Repository: Repository<MatCateEntity>,

  ) {}
  //如查找数据
  async find(json:MatCateDto = {}){
    try {
      return await this.Repository.find(json);
    }catch (err){
      return err;
    }
  }

  async add(json: MatCateDto){
    try {
      await this.Repository.save(json);

      return [];
    } catch (error) {
      return null;
    }
  }

  async update(json1:MatCateDto,json2:MatCateDto){
    try {
      return  await this.Repository.update(json1,json2);

    } catch (error) {
      return null;
    }
  }

  async delete(json:MatCateDto){
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
