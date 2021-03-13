import { Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class AccessEntity {
  @PrimaryGeneratedColumn()//主键(自动更新)
  id: number;

  @Column({ length: 255 })
  module_name: string;

  @Column({ length: 255 })
  action_name: string;

  @Column({ length: 255 })
  url: string;

  @Column('int')
  module_id: number;

  @Column('int')
  status: number;

  @Column('int')
  type: number;

  @Column('int')
  sort: number;

  @Column("varchar",{ length: 255 })
  describe: string;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  create_time: Date;

}