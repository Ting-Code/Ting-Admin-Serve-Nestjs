import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { getConnection, Repository } from "typeorm";
import { AuthEntity } from "@libs/db/models/auths/auth/auth.entity";
import { AdminService } from "@libs/db/models/auths/admin/admin.service";
import { AccessService } from "@libs/db/models/auths/access/access.service";


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
    private adminService: AdminService,
    private accessService: AccessService
  ) {}

  async upAuth(id, data) {
    // 获取连接并创建新的queryRunner
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    // 使用我们的新queryRunner建立真正的数据库连
    await queryRunner.connect();
    // 开始事务：
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.delete(AuthEntity, {role_id: id})
      for (let i=0; i<data.length; i++){
        await queryRunner.manager.save(AuthEntity, {role_id: id, access_id:data[i]})
      }
      // 提交事务：
      await queryRunner.commitTransaction();
      return true
    } catch (err) {
      //回滚事务
      await queryRunner.rollbackTransaction();
      return false
    }
  }

  getAuth(id){
    return this.authRepository.find({role_id:id})
  }

  async checkAuth(req) {
    //  1、获取当前用户的角色
    const pathname: string = req.baseUrl.split("/")[2];

    // const userinfo = req.session.userinfo;
    const userinfo = "admin"
    const data =await this.adminService.find({ username: userinfo })
    if (data[0].is_super == 1 || pathname == 'login' || pathname == "main/welcome" || pathname == "main") {
      return true;
    }
    // 2、根据角色获取当前角色的权限列表
    let accessResult = await this.authRepository.find({ "role_id": data[0].role_id });
    const roleAccessArray = [];
    accessResult.forEach(value => {
      roleAccessArray.push(value.access_id);
    });
    //   3、获取当前访问的url 对应的权限id
    accessResult = await this.accessService.find({ "url": pathname });
    if (accessResult.length > 0) {
      // 4、判断当前访问的url对应的权限id 是否在权限列表中的id中
      return roleAccessArray.indexOf(accessResult[0].id) !== -1;
    } else {
      return false;
    }
  }

}
