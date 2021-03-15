import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
const d = new Date();

@Entity()
export class AdminEntity {
  @PrimaryGeneratedColumn()//主键(自动更新)
  id: number;

  @Column({ length: 255 })
  username: string;

  @Column("varchar",{ length: 255 })
  password: string;

  @Column({
    nullable: true,
    length: 255
  })
  nickname: string;

  @Column('int',{
    nullable: true
  })
  phone: number;

  @Column({
    length: 255,
    nullable: true
  })
  branch: string;

  @Column({
    length: 255,
    nullable: true
  })
  number: string;

  @Column('int', {default: 0})
  is_super: number;

  @Column('int')
  role_id: number;

  @Column({
    length: 255,
    nullable: true
  })
  role_name: string;

  @Column('int', {
    default: 1,
  })
  status: number;

  @Column({
    length: 255 ,
    nullable: true
  })
  describe: string;

  @Column({
    default: d.getTime().toString(),
  })
  create_time: string;


}