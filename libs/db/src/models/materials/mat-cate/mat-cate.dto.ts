import { ApiProperty } from "@nestjs/swagger";

export class MatCateDto {
  @ApiProperty({description: '权限id'})
  id?: number;

  @ApiProperty({description: '父级id'})
  pid?: number;

  @ApiProperty({description: '父级id路径'})
  pid_path?: string;

  @ApiProperty({description: '分类级'})
  level?: number;

  @ApiProperty({description: '分类路径名称'})
  pid_path_name?: string;

  @ApiProperty({description: '分类状态'})
  status?: number;

  @ApiProperty({description: '排序'})
  sort?: number;

  @ApiProperty({description: '权限描述'})
  describe?: string;

  @ApiProperty({description: '创建时间'})
  create_time?: string;

  @ApiProperty({description: '分类名称'})
  cate_name?: string;

}
