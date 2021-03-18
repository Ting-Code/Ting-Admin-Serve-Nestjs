import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { getConnection, Repository } from "typeorm";
import { TypeTestDto } from "@libs/db/models/materials/type-test/type-test.dto";
import { TypeTestEntity } from "@libs/db/models/materials/type-test/type-test.entity";

@Injectable()
export class TypeTestService {

  constructor(
    //引入数据库表示例赋值给articleRepository
    @InjectRepository(TypeTestEntity)
    private readonly testRepository: Repository<TypeTestEntity>,

  ) {}
  //如查找数据
  async find(json:TypeTestDto = {}){
    try {
      return await this.testRepository.find(json);
    }catch (err){
      return err;
    }
  }

  async add(json: TypeTestDto){
    try {
      await this.testRepository.save(json);

      return [];
    } catch (error) {
      return null;
    }
  }

  async update(json1:TypeTestDto,json2:TypeTestDto){
    try {
      return  await this.testRepository.update(json1,json2);

    } catch (error) {
      return null;
    }
  }

  async delete(json:TypeTestDto){
    try {
      return await this.testRepository.delete(json);
    } catch (error) {
      return null;
    }
  }

  async getModel() {
    return this.testRepository
  }

}
