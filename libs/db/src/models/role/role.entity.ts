import { Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class RoleEntity {
  @PrimaryGeneratedColumn()//主键(自动更新)
  id: number;

  @Column({ length: 255 })
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

}