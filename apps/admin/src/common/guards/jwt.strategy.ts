import { StrategyOptions, Strategy, ExtractJwt } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { AdminEntity } from "@libs/db/models/auths/admin/admin.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


//jwt策略类
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
  constructor(@InjectRepository(AdminEntity)
              private readonly adminRepository: Repository<AdminEntity>,) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "process.env.SECRET"
    } as StrategyOptions);
  }

  //自动调用传给他
  async validate(id){
    return await this.adminRepository.find({username:id})
  }
}