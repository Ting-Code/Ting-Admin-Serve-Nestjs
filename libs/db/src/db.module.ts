import { Global, Module } from "@nestjs/common";
import { DbService } from './db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from "@libs/db/models/auths/admin/admin.entity";
import { AdminService } from './models/auths/admin/admin.service';
import { RoleService } from './models/auths/role/role.service';
import { RoleEntity } from "@libs/db/models/auths/role/role.entity";
import { AccessService } from './models/auths/access/access.service';
import { AccessEntity } from "@libs/db/models/auths/access/access.entity";
import { AuthEntity } from "@libs/db/models/auths/auth/auth.entity";
import { AuthService } from "@libs/db/models/auths/auth/auth.service";
import { MatTypeService } from './models/materials/mat-type/mat-type.service';
import { MatTypeEntity } from "@libs/db/models/materials/mat-type/mat-type.entity";
import { TypeTestService } from './models/materials/type-test/type-test.service';
import { TypeTestEntity } from "@libs/db/models/materials/type-test/type-test.entity";
import { MatCateService } from './models/materials/mat-cate/mat-cate.service';
import { MatCateEntity } from "@libs/db/models/materials/mat-cate/mat-cate.entity";
import { MaterialService } from './models/materials/material/material.service';
import { MaterialEntity } from "@libs/db/models/materials/material/material.entity";
import { MatTestEntity } from "@libs/db/models/materials/material/mat-test.entity";
import { ImageEntity } from "@libs/db/models/materials/material/image.entity";
import { TestEntity } from "@libs/db/models/materials/test/test.entity";
import { TestService } from './models/materials/test/test.service';

const Entitys = TypeOrmModule.forFeature([AdminEntity, RoleEntity, AccessEntity, AuthEntity, MatTypeEntity, TypeTestEntity, MatCateEntity, MaterialEntity, MatTestEntity, ImageEntity, TestEntity])
const Mssql = TypeOrmModule.forFeature([], 'msSql')

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
      entities: [AdminEntity, RoleEntity, AccessEntity, AuthEntity, MatTypeEntity, TypeTestEntity, MatCateEntity, MaterialEntity, MatTestEntity, ImageEntity, TestEntity],
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
      entities: [],
      synchronize: true,
    },),
  ],
  providers: [DbService, AdminService, RoleService, AccessService, AuthService, MatTypeService, TypeTestService, MatCateService, MaterialService, TestService],
  exports: [Mssql, Entitys, DbService, AdminService, RoleService, AccessService, AuthService, MatTypeService, TypeTestService, MatCateService, TestService],
})
export class DbModule {}
