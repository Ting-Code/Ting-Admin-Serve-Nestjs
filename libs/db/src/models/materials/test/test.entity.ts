import { Entity, Column, PrimaryGeneratedColumn} from "typeorm";
const d = new Date()

@Entity()
export class TestEntity {
  @PrimaryGeneratedColumn()//主键(自动更新)
  id: number;

  @Column({
    length: 255,
    nullable: true
  })
  dis: string;

  @Column({
    default: d.getTime().toString(),
  })
  create_time: string;

}