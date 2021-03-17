import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getConnection, Repository } from "typeorm";
import { AdminEntity } from "@libs/db/models/admin/admin.entity";
import { AdminInterface } from "@libs/db/models/admin/admin.interface";
import { RoleEntity } from "@libs/db/models/role/role.entity";

@Injectable()
export class AdminService {

  constructor(
    //引入数据库表示例赋值给articleRepository
    @InjectRepository(AdminEntity, "mySql")
    private readonly adminRepository: Repository<AdminEntity>,

  ) {}
  //如查找数据
  async find(json:AdminInterface = {}){
    try {
      return await this.adminRepository.find(json);
    }catch (err){
      return err;
    }
  }

  async add(json: AdminInterface){
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

  async getModel() {
    const posts = await getConnection()
      .createQueryBuilder(AdminEntity, 'admin')
      .leftJoinAndMapOne('admin.role', RoleEntity, 'role', 'admin.role_id=role.id')
      .getManyAndCount()
    return posts[0]
  }

}
