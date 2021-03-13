import { Global, Module } from "@nestjs/common";
import { DbService } from './db.service';
//导入TypeOrmModule
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from "@libs/db/models/admin/admin.entity";
import { AdminService } from './models/admin/admin.service';
import { RoleService } from './models/role/role.service';
import { RoleEntity } from "@libs/db/models/role/role.entity";
import { AccessService } from './models/access/access.service';
import { AccessEntity } from "@libs/db/models/access/access.entity";


const Entitys = TypeOrmModule.forFeature([Admin, RoleEntity, AccessEntity])

@Global()
@Module({

  imports: [Entitys,
    //配置数据库
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',

      // type: 'mssql',
      // host: '127.0.0.1',
      // port: 1433,
      // username: 'TING',
      // password: '1127163161',

      database: 'hmjd',
      // entities: [__dirname + '/**/**/*.entity{.ts,.js}'],
      entities: [Admin, RoleEntity, AccessEntity],
      synchronize: true,
    }),
  ],
  providers: [DbService, AdminService, RoleService, AccessService],
  exports: [Entitys, DbService, AdminService, RoleService, AccessService],
})
export class DbModule {}
