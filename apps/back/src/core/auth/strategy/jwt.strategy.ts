import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/features/user/user.service';
import { UserEntity } from 'src/features/user/user.entity';
import { Payload } from 'src/shared/lib/interfaces/auth';
import environment from 'environments/environment';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: environment.accessTokenSecret,
      ignoreExpiration: environment.ignoreExpiration,
    });
  }

  async validate(payload: Payload): Promise<UserEntity> {
    return await this.userService.get(payload.sub);
  }
}
