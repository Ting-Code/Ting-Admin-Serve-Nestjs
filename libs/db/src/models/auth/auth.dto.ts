import { ApiProperty} from "@nestjs/swagger";

export class AuthDto {
  @ApiProperty({description: 'id'})
  id?: number;

  @ApiProperty({description: '角色id'})
  role_id?: number;

  @ApiProperty({description: '角色id'})
  access_id?: number;

}