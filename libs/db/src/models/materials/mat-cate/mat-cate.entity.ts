import { Entity, Column, PrimaryGeneratedColumn} from "typeorm";
const d = new Date()

@Entity()
export class MatCateEntity {
  @PrimaryGeneratedColumn()//主键(自动更新)
  id: number;

  @Column({ length: 255, nullable: true })
  pid_path_name: string;

  @Column('int', {
    default: 1
  })
  pid: number;

  @Column({ length: 255 })
  pid_path: string;

  @Column({
    length: 255 , })
  cate_name: string;

  @Column('int',{
    default: 0
  })
  level: number;

  @Column('int', {
    default: 1
  })
  status: number;

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