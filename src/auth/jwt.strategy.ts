import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(/* private readonly authService: AuthService */) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'artqvaradzmurad',
    });
  }

  async validate(payload, done: (error, data) => void) {
    try {
      done(null, payload);
    } catch (error) {
      throw new UnauthorizedException('unauthorized', error.message);
    }
  }
}
