import { ApiProperty } from "@nestjs/swagger";

export class MaterialDto {
  @ApiProperty({description: '物料id'})
  id?: number;

  @ApiProperty({description: '类型id'})
  type_id?: number;

  @ApiProperty({description: '分类id'})
  cate_id?: number;

  @ApiProperty({description: '物料名称'})
  mat_name?: string;

  @ApiProperty({description: '送样时间'})
  delivery_date?: string;

  @ApiProperty({description: '送样情况'})
  delivery_desc?: string;

  @ApiProperty({description: '样品数量'})
  delivery_num?: number;

  @ApiProperty({description: '状态'})
  status?: number;

  @ApiProperty({description: '送样次数'})
  delivery_several?: number;

  @ApiProperty({description: '物料logo'})
  mat_logo?: string;

  @ApiProperty({description: 'No号'})
  no?: string;

  @ApiProperty({description: 'erp编码'})
  erp?: string;

  @ApiProperty({description: '我司规格'})
  mat_spec?: string;

  @ApiProperty({description: '供应商规格'})
  supplier_spec?: string;

  @ApiProperty({description: '供应商资料'})
  supplier_info?: string;

  @ApiProperty({description: '供货商品牌'})
  supplier_brand?: string;

  @ApiProperty({description: '供货商'})
  supplier?: string;

  @ApiProperty({description: '检验依据'})
  test_based?: string;

  @ApiProperty({description: '检验性质'})
  test_new?: string;

  @ApiProperty({description: '检验环境'})
  test_setting?: string;

  @ApiProperty({description: '关键词'})
  keywords?: string;

  @ApiProperty({description: '工程审核描述'})
  project?: string;

  @ApiProperty({description: '工程审核'})
  is_project?: number;

  @ApiProperty({description: '审批意见'})
  approve?: string;

  @ApiProperty({description: '审批'})
  is_approve?: number;

  @ApiProperty({description: '技术意见'})
  technician?: string;

  @ApiProperty({description: '技术审核'})
  is_technician?: number;

  @ApiProperty({description: '改进描述'})
  mend?: string;

  @ApiProperty({description: '其他意见描述'})
  is_mend?: number;

  @ApiProperty({description: '其他意见'})
  else?: string;

  @ApiProperty({description: '采购意见'})
  is_else?: number;

  @ApiProperty({description: '采购审核'})
  purchase?: string;

  @ApiProperty({description: '权限id'})
  is_purchase?: number;

  @ApiProperty({description: '总结是否及格说明'})
  conclusion?: string;

  @ApiProperty({description: '总结是否及格'})
  is_conclusion?: number;

  @ApiProperty({description: '权限id'})
  audit?: string;

  @ApiProperty({description: '是否审核及格说明'})
  is_audit?: number;

  @ApiProperty({description: '是否审核及格'})
  sort?: number;

  @ApiProperty({description: '软删除'})
  is_delete?: number;

  @ApiProperty({description: '创建时间'})
  create_time?: string;

}
