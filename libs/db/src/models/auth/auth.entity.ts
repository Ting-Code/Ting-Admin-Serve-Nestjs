import { Entity, Column, PrimaryGeneratedColumn} from "typeorm";
const d = new Date()

@Entity()
export class AuthEntity {
  @PrimaryGeneratedColumn()//主键(自动更新)
  id: number;

  @Column('int')
  access_id: number;

  @Column('int')
  role_id: number;



}