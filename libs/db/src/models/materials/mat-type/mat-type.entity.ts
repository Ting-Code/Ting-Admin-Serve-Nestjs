import { Entity, Column, PrimaryGeneratedColumn} from "typeorm";
const d = new Date()

@Entity()
export class MatTypeEntity {
  @PrimaryGeneratedColumn()//主键(自动更新)
  id: number;

  @Column({ length: 255 })
  type_name: string;

  @Column('int',{
    default: 1
  })
  status: number;

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