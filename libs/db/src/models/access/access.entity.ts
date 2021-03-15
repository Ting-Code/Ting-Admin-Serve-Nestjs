import { Entity, Column, PrimaryGeneratedColumn} from "typeorm";
const d = new Date()

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

  @Column('int', {
    default: 1
  })
  status: number;

  @Column('int')
  type: number;

  @Column('int',{
    default: 0
  })
  sort: number;

  @Column({
    length: 255,
    nullable: true
  })
  describe: string;

  @Column({
    default: d.getTime().toString(),
  })
  create_time: string;

}