import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
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

  @ApiProperty({description: '超级管理员'})
  @Column('int', {default: 0})
  is_super: number;

  @ApiProperty({description: '角色ID'})
  @Column('int')
  role_id: number;

  @ApiProperty({description: '角色名'})
  @Column('varchar')
  role_name: string;

  @ApiProperty({description: '状态'})
  @Column('int')
  status: number;

  @ApiProperty({description: '描述'})
  @Column("varchar",{ length: 255 })
  describe: string;

  @ApiProperty({description: '创建时间'})
  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  create_time: Date;
  @ApiProperty({description: '更新时间'})
  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  update_time: Date;

}