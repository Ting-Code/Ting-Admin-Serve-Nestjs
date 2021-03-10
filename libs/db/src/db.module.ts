import { Global, Module } from "@nestjs/common";
import { DbService } from './db.service';
//导入TypeOrmModule
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from "@libs/db/models/admin/admin.entity";
import { AdminService } from './models/admin/admin.service';


const Entitys = TypeOrmModule.forFeature([Admin])

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
      entities: [Admin],
      synchronize: true,
    }),
  ],
  providers: [DbService, AdminService],
  exports: [Entitys, DbService, AdminService],
})
export class DbModule {}
