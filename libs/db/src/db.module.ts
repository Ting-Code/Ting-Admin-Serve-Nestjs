import { Global, Module } from "@nestjs/common";
import { DbService } from './db.service';
//导入TypeOrmModule
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from "@libs/db/models/auths/admin/admin.entity";
import { AdminService } from './models/auths/admin/admin.service';
import { RoleService } from './models/auths/role/role.service';
import { RoleEntity } from "@libs/db/models/auths/role/role.entity";
import { AccessService } from './models/auths/access/access.service';
import { AccessEntity } from "@libs/db/models/auths/access/access.entity";
import { AuthEntity } from "@libs/db/models/auths/auth/auth.entity";
import { AuthService } from "@libs/db/models/auths/auth/auth.service";
import { MaterielEntity } from "@libs/db/models/materials/materiel/materiel.entity";
import { MatTypeService } from './models/materials/mat-type/mat-type.service';
import { MatTypeEntity } from "@libs/db/models/materials/mat-type/mat-type.entity";
import { TypeTestService } from './models/materials/type-test/type-test.service';
import { TypeTestEntity } from "@libs/db/models/materials/type-test/type-test.entity";
import { MatCateService } from './models/materials/mat-cate/mat-cate.service';
import { MatCateEntity } from "@libs/db/models/materials/mat-cate/mat-cate.entity";

const Entitys = TypeOrmModule.forFeature([AdminEntity, RoleEntity, AccessEntity, AuthEntity, MatTypeEntity, TypeTestEntity, MatCateEntity])
const Mssql = TypeOrmModule.forFeature([MaterielEntity], 'msSql')

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
      database: 'hmjd',
      // entities: [__dirname + '/**/**/*.entity{.ts,.js}'],
      entities: [AdminEntity, RoleEntity, AccessEntity, AuthEntity, MatTypeEntity, TypeTestEntity, MatCateEntity],
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
  providers: [DbService, AdminService, RoleService, AccessService, AuthService, MatTypeService, TypeTestService, MatCateService],
  exports: [Mssql, Entitys, DbService, AdminService, RoleService, AccessService, AuthService, MatTypeService, TypeTestService, MatCateService],
})
export class DbModule {}
