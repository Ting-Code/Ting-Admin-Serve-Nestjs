import { Entity, Column, PrimaryGeneratedColumn} from "typeorm";
const d = new Date()

@Entity()
export class ImageEntity {
  @PrimaryGeneratedColumn()//主键(自动更新)
  id: number;

  @Column('int')
  mat_id: number;

  @Column({ length: 255 })
  img_url: string;

  @Column({
    default: d.getTime().toString(),
  })
  create_time: string;

}