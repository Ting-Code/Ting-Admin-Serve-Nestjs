import { ApiProperty} from "@nestjs/swagger";

export class MatTypeDto {
  @ApiProperty({description: '物料类型id'})
  id?: number;

  @ApiProperty({description: '描述'})
  describe?: string;

  @ApiProperty({description: '状态'})
  status?: number;

  @ApiProperty({description: '创建时间'})
  create_time?: string;

  @ApiProperty({description: '物料类型'})
  type_name?: string;

}