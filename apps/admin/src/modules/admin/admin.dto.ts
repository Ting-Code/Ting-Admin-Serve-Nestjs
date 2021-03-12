import { ApiProperty } from "@nestjs/swagger";

export class AdminDto {
  @ApiProperty({description: 'admin-id'})
  id?: number;

  @ApiProperty({description: '用户名'})
  username?: string;

  @ApiProperty({description: '密码'})
  password?: string;

  @ApiProperty({description: '姓名'})
  nickname?: string;

  @ApiProperty({description: '手机号'})
  phone?: number;

  @ApiProperty({description: '部门'})
  branch?: string;

  @ApiProperty({description: '工号'})
  number?: string;

  @ApiProperty({description: '超级管理员'})
  is_super?: number;

  @ApiProperty({description: '角色ID'})
  role_id?: number;

  @ApiProperty({description: '角色名'})
  role_name?: string;

  @ApiProperty({description: '状态'})
  status?: number;

  @ApiProperty({description: '描述'})
  describe?: string;

  @ApiProperty({description: '创建时间'})
  create_time?: Date;

  @ApiProperty({description: '更新时间'})
  update_time?: Date;

}