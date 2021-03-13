import { ApiProperty } from "@nestjs/swagger";

export interface AdminInterface {
  id?: number;
  username?: string;
  password?: string;
  nickname?: string;
  phone?: number;
  branch?: string;
  number?: string;
  is_super?: number;
  role_id?: number;
  role_name?: string;
  status?: number;
  describe?: string;
  create_time?: Date;
  update_time?: Date;
}

