import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Admin } from "@libs/db/models/admin/admin.entity";
import { AdminInterface } from "@libs/db/models/admin/admin.interface";

@Injectable()
export class AdminService {

  constructor(
    //引入数据库表示例赋值给articleRepository
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,

  ) {}
  //如查找数据
  async find(json:AdminInterface = {}){
    try {
      return await this.adminRepository.find(json);
    }catch (err){
      return err;
    }
  }

  async add(json:AdminInterface){
    try {
      await this.adminRepository.save(json);

      return [];
    } catch (error) {
      return null;
    }
  }

  async update(json1:AdminInterface,json2:AdminInterface){
    try {
      return  await this.adminRepository.update(json1,json2);

    } catch (error) {
      return null;
    }
  }

  async delete(json:AdminInterface){
    try {
      return await this.adminRepository.delete(json);
    } catch (error) {
      return null;
    }
  }

  getModel(){
    return this.adminRepository;
  }

}
