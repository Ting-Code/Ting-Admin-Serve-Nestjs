import { ApiProperty } from "@nestjs/swagger";

export class TestDto {
  @ApiProperty({description: '物料id'})
  id?: number;

  @ApiProperty({description: 'dis'})
  dis?: string;

  @ApiProperty({description: '创建时间'})
  create_time?: string;

}
