import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
  @ApiProperty({description: '验证码'})
  code: string

}