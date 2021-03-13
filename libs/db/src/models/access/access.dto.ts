import { ApiProperty } from "@nestjs/swagger";

export class AccessDto {
  @ApiProperty({description: '权限id'})
  id?: number;

  @ApiProperty({description: '权限模块名称'})
  module_name?: string;

  @ApiProperty({description: '权限操作名称'})
  action_name?: string;

  @ApiProperty({description: '权限URL'})
  url?: string;

  @ApiProperty({description: '权限父级id'})
  module_id?: number;

  @ApiProperty({description: '权限状态'})
  status?: number;

  @ApiProperty({description: '权限类型（1|2|3）'})
  type?: number;

  @ApiProperty({description: '权限排序'})
  sort?: number;

  @ApiProperty({description: '权限描述'})
  describe?: string;

  @ApiProperty({description: '创建时间'})
  create_time?: Date;

}