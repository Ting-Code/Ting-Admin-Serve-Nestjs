import { IStrategyOptions, Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Admin } from "@libs/db/models/admin/admin.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BadRequestException } from "@nestjs/common";
import { compareSync } from "bcryptjs";

//本地策略类
export class LocalStrategy extends PassportStrategy(Strategy, 'local'){
  constructor(    @InjectRepository(Admin)
                  private readonly adminRepository: Repository<Admin>,) {
    super({
      usernameField: 'username',
      passwordField: 'password'
    } as IStrategyOptions);
  }

  //自动调用传给他
  async validate(username: string, password: string){
    if(username === "" || password === ""){
      throw new BadRequestException({msg:"请输入登录名和密码",code:200})
    }
    const user = await  this.adminRepository.findOne({"username":username})
    if (!user){
      //抛出异常
      throw new BadRequestException({msg:"用户名不存在",code:200})
    }
    //对比校验
    if(!compareSync(password, user.password)){
      throw new BadRequestException({msg:"密码错误", code:200})
    }
    //成功就返回对应数据
    return user
  }
}