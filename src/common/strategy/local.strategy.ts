import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../api/user/service/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super();
  }

  async validate(mobileEmail: string): Promise<any> {
    const user = await this.userService.findByEntity(mobileEmail);
    console.log(user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
