import { Global, Module } from "@nestjs/common";
import { DbService } from './db.service';
//导入TypeOrmModule
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from "@libs/db/models/admin/admin.entity";
import { AdminService } from './models/admin/admin.service';
import { RoleService } from './models/role/role.service';
import { RoleEntity } from "@libs/db/models/role/role.entity";
import { AccessService } from './models/access/access.service';
import { AccessEntity } from "@libs/db/models/access/access.entity";
import { AuthEntity } from "@libs/db/models/auth/auth.entity";
import { AuthService } from "@libs/db/models/auth/auth.service";
import { MaterielEntity } from "@libs/db/models/materiel/materiel.entity";

const Entitys = TypeOrmModule.forFeature([AdminEntity, RoleEntity, AccessEntity, AuthEntity], 'mySql')
const Mssql = TypeOrmModule.forFeature([MaterielEntity], 'msSql')

@Global()
@Module({

  imports: [Entitys,
    //配置数据库
    TypeOrmModule.forRoot({
      name: 'mySql',
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'hmjd',
      // entities: [__dirname + '/**/**/*.entity{.ts,.js}'],
      entities: [AdminEntity, RoleEntity, AccessEntity, AuthEntity],
      synchronize: true,
    },),
    TypeOrmModule.forRoot({
      name: 'msSql',
      type: 'mssql',
      host: '127.0.0.1',
      port: 1433,
      username: 'TING',
      password: '1127163161',
      database: 'hmjd',
      entities: [MaterielEntity],
      synchronize: true,
    },),
  ],
  providers: [DbService, AdminService, RoleService, AccessService, AuthService],
  exports: [Mssql, Entitys, DbService, AdminService, RoleService, AccessService, AuthService],
})
export class DbModule {}
