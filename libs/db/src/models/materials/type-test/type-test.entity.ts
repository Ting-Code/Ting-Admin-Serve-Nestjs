import { Entity, Column, PrimaryGeneratedColumn} from "typeorm";
const d = new Date()

@Entity()
export class TypeTestEntity {
  @PrimaryGeneratedColumn()//主键(自动更新)
  id: number;

  @Column('int')
  type_id: number;

  @Column({
    length: 255,
    nullable: true
  })
  test: string;

  @Column({
    length: 255,
    nullable: true
  })
  requ: string;

  @Column({
    length: 255,
    nullable: true
  })
  result: string;

  @Column({
    length: 255,
    nullable: true
  })
  is_pass: string;

}