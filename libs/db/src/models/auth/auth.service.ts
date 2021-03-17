import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { getConnection, Repository, Transaction, TransactionRepository } from "typeorm";
import { AuthEntity } from "@libs/db/models/auth/auth.entity";


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
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

}
