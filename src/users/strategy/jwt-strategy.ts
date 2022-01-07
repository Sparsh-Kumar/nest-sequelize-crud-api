import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { USER_REPOSITORY } from "../constants";
import { Users } from "../models/users.model";
import { DecodedJWTPayload } from "../providers/users.providers";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userSecondRepo: typeof Users
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    })
  }
  async validate(payload: DecodedJWTPayload): Promise<any> {
    const { id } = payload;
    const isUserExist = await this.userSecondRepo.findOne(
      {
        where: {
          id
        }
      }
    )
    if(!isUserExist) {
      throw new UnauthorizedException();
    }
    return isUserExist;
  }
}
