import { Entity, Column, PrimaryGeneratedColumn} from "typeorm";
const d = new Date()

@Entity()
export class MaterialEntity {
  @PrimaryGeneratedColumn()//主键(自动更新)
  id: number;

  @Column('int')
  type_id: number;

  @Column('int')
  cate_id: number;

  @Column({ length: 255 })
  mat_name: string;

  @Column({ length: 255, nullable: true})
  delivery_date: string;

  @Column({ length: 255, nullable: true})
  delivery_desc: string;

  @Column('int',{
    default: 0
  })
  delivery_num: number;

  @Column('int', {
    default: 1
  })
  status: number;

  @Column('int',{
    default: 0
  })
  delivery_several: number;

  @Column({
    length: 255,
    nullable: true
  })
  mat_logo: string;

  @Column({
    length: 255,
    nullable: true
  })
  no: string;

  @Column({
    length: 255,
    nullable: true
  })
  erp: string;

  @Column({
    length: 255,
    nullable: true
  })
  mat_spec: string;

  @Column({
    length: 255,
    nullable: true
  })
  supplier_spec: string;

  @Column({
    length: 255,
    nullable: true
  })
  supplier_info: string;

  @Column({
    length: 255,
    nullable: true
  })
  supplier_brand: string;

  @Column({
    length: 255,
    nullable: true
  })
  supplier: string;

  @Column({
    length: 255,
    nullable: true
  })
  test_based: string;

  @Column({
    length: 255,
    nullable: true
  })
  test_new: string;

  @Column({
    length: 255,
    nullable: true
  })
  test_setting: string;

  @Column({
    length: 255,
    nullable: true
  })
  keywords: string;

  @Column({
    length: 255,
    nullable: true
  })
  project: string;

  @Column('int',{
    default: 0
  })
  is_project: number;

  @Column({
    length: 255,
    nullable: true
  })
  approve: string;

  @Column('int',{
    default: 0
  })
  is_approve: number;

  @Column({
    length: 255,
    nullable: true
  })
  technician: string;

  @Column('int',{
    default: 0
  })
  is_technician: number;

  @Column({
    length: 255,
    nullable: true
  })
  mend: string;

  @Column('int',{
    default: 0
  })
  is_mend: number;

  @Column({
    length: 255,
    nullable: true
  })
  else: string;

  @Column('int',{
    default: 0
  })
  is_else: number;

  @Column({
    length: 255,
    nullable: true
  })
  purchase: string;

  @Column('int',{
    default: 0
  })
  is_purchase: number;

  @Column({
    length: 255,
    nullable: true
  })
  conclusion: string;

  @Column('int',{
    default: 0
  })
  is_conclusion: number;

  @Column({
    length: 255,
    nullable: true
  })
  audit: string;

  @Column('int',{
    default: 0
  })
  is_audit: number;

  @Column('int',{
    default: 0
  })
  sort: number;

  @Column('int',{
    default: 0
  })
  is_delete: number;

  @Column({
    default: d.getTime().toString(),
  })
  create_time: string;

}