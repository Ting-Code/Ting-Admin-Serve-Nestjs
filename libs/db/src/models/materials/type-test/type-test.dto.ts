import { ApiProperty} from "@nestjs/swagger";

export class TypeTestDto {
  @ApiProperty({description: '物料类型id'})
  id?: number;

  @ApiProperty({description: '物料测试类型id'})
  type_id?: number;

  @ApiProperty({description: '参数要求'})
  requ?: string;

  @ApiProperty({description: '检验结果'})
  result?: string;

  @ApiProperty({description: '判定'})
  is_pass?: string;

  @ApiProperty({description: '检验项目'})
  test?: string;
}
