import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { getConnection, Repository } from "typeorm";
import { AccessEntity } from "@libs/db/models/auths/access/access.entity";
import { AccessDto } from "@libs/db/models/auths/access/access.dto";

@Injectable()
export class AccessService {

  constructor(
    //引入数据库表示例赋值给articleRepository
    @InjectRepository(AccessEntity)
    private readonly accessRepository: Repository<AccessEntity>,

  ) {}
  //如查找数据
  async find(json:AccessDto = {}){
    try {
      return await this.accessRepository.find(json);
    }catch (err){
      return err;
    }
  }

  async add(json: AccessDto){
    try {
      await this.accessRepository.save(json);

      return [];
    } catch (error) {
      return null;
    }
  }

  async update(json1:AccessDto,json2:AccessDto){
    try {
      return  await this.accessRepository.update(json1,json2);

    } catch (error) {
      return null;
    }
  }

  async delete(json:AccessDto){
    try {
      return await this.accessRepository.delete(json);
    } catch (error) {
      return null;
    }
  }

  async getModel() {
    const posts = await getConnection()
      .createQueryBuilder(AccessEntity, 'access')
      .leftJoinAndMapMany('access.son', AccessEntity, 'son', 'access.id=son.module_id')
      .where("access.module_id = :module_id",{ module_id: 0})
      .getManyAndCount()
    return posts
  }

}
