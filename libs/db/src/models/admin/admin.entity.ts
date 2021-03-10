import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";


@Entity()
export class Admin {
  @PrimaryGeneratedColumn()//主键(自动更新)
  @ApiProperty({description: 'admin-id'})
  id: number;


  @Column({ length: 255 })
  @ApiProperty({description: '用户名'})
  username: string;

  @ApiProperty({description: '密码'})
  @Column("varchar",{ length: 255 })
  password: string;

  @ApiProperty({description: '姓名'})
  @Column("varchar",{ length: 255 })
  nickname: string;

  @ApiProperty({description: '手机号'})
  @Column('int')
  phone: number;

  @ApiProperty({description: '部门'})
  @Column("varchar",{ length: 255 })
  branch: string;

  @ApiProperty({description: '工号'})
  @Column("varchar",{ length: 255 })
  number: string;

  @ApiProperty({description: '状态'})
  @Column('int')
  status: number;

  @ApiProperty({description: '描述'})
  @Column("varchar",{ length: 255 })
  describe: string;

  @ApiProperty({description: '创建时间'})
  @Column('int')
  create_time: number;

  @ApiProperty({description: '更新时间'})
  @Column()
  update_time: number;

}