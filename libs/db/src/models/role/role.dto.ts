import { ApiProperty} from "@nestjs/swagger";

export class RoleDto {
  @ApiProperty({description: '角色id'})
  id?: number;

  @ApiProperty({description: '角色名'})
  role_name?: string;

  @ApiProperty({description: '状态'})
  status?: number;

  @ApiProperty({description: '描述'})
  describe?: string;

  @ApiProperty({description: '创建时间'})
  create_time?: Date;

}