import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuthEntity } from "@libs/db/models/auth/auth.entity";
import { AccessDto } from "@libs/db/models/access/access.dto";

@Injectable()
export class AuthService {

  constructor(
    //引入数据库表示例赋值给articleRepository
    @InjectRepository(AuthEntity)
    private readonly AuthRepository: Repository<AuthEntity>,
  ) {}
  //如查找数据
  async find(json:AccessDto = {}){
    try {
      return await this.AuthRepository.find(json);
    }catch (err){
      return err;
    }
  }

  async add(json: AccessDto){
    try {
      await this.AuthRepository.save(json);

      return [];
    } catch (error) {
      return error;
    }
  }

  async update(json1:AccessDto,json2:AccessDto){
    try {
      return await this.AuthRepository.update(json1,json2);
    } catch (error) {
      return error;
    }
  }

  async delete(json:AccessDto){
    try {
      return await this.AuthRepository.delete(json);
    } catch (error) {
      return error;
    }
  }

  getModel(){
    return this.AuthRepository;
  }

}
