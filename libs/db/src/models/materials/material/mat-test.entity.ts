import { Entity, Column, PrimaryGeneratedColumn} from "typeorm";
const d = new Date()

@Entity()
export class MatTestEntity {
  @PrimaryGeneratedColumn()//主键(自动更新)
  id: number;

  @Column('int')
  mat_id: number;

  @Column({ length: 255 })
  test: string;

  @Column('text')
  requ: string;

  @Column('text')
  result: string;

  @Column({ length: 255 })
  is_pass: string;

  @Column({
    default: d.getTime().toString(),
  })
  create_time: string;

}