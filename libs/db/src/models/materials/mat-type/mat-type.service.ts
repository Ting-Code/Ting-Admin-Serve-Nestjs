import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { getConnection, Repository } from "typeorm";
import { MatTypeEntity } from "@libs/db/models/materials/mat-type/mat-type.entity";
import { MatTypeDto } from "@libs/db/models/materials/mat-type/mat-type.dto";

@Injectable()
export class MatTypeService {

  constructor(
    //引入数据库表示例赋值给articleRepository
    @InjectRepository(MatTypeEntity)
    private readonly accessRepository: Repository<MatTypeEntity>,

  ) {}
  //如查找数据
  async find(json:MatTypeDto = {}){
    try {
      return await this.accessRepository.find(json);
    }catch (err){
      return err;
    }
  }

  async add(json: MatTypeDto){
    try {
      await this.accessRepository.save(json);

      return [];
    } catch (error) {
      return null;
    }
  }

  async update(json1:MatTypeDto,json2:MatTypeDto){
    try {
      return  await this.accessRepository.update(json1,json2);

    } catch (error) {
      return null;
    }
  }

  async delete(json:MatTypeDto){
    try {
      return await this.accessRepository.delete(json);
    } catch (error) {
      return null;
    }
  }

  async getModel() {
    const posts = await getConnection()
      .createQueryBuilder(MatTypeDto, 'access')
      .leftJoinAndMapMany('access.son', MatTypeDto, 'son', 'access.id=son.module_id')
      .where("access.module_id = :module_id",{ module_id: 0})
      .getManyAndCount()
    return posts
  }

}
