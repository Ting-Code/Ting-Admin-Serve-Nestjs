import { Entity, Column, PrimaryGeneratedColumn} from "typeorm";
const d = new Date()

@Entity()
export class MaterielEntity {
  @PrimaryGeneratedColumn()//主键(自动更新)
  id: number;

  @Column({ length: 255 })
  module_name: string;

  @Column({ length: 255 })
  action_name: string;

  @Column({ length: 255 })
  url: string;

}