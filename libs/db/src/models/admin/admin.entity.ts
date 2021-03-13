import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Admin {
  @PrimaryGeneratedColumn()//主键(自动更新)
  id: number;

  @Column({ length: 255 })
  username: string;

  @Column("varchar",{ length: 255 })
  password: string;

  @Column("varchar",{ length: 255 })
  nickname: string;

  @Column('int')
  phone: number;

  @Column("varchar",{ length: 255 })
  branch: string;

  @Column("varchar",{ length: 255 })
  number: string;

  @Column('int', {default: 0})
  is_super: number;

  @Column('int')
  role_id: number;

  @Column('varchar')
  role_name: string;

  @Column('int')
  status: number;

  @Column("varchar",{ length: 255 })
  describe: string;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  create_time: Date;
  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  update_time: Date;

}