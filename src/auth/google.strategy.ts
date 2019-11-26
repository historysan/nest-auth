import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService, Provider } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: '804327831896-fqull12cts1nhhmstcl14susal6saurs.apps.googleusercontent.com',
      clientSecret: 'fcBu75UsrRE37TkkQ6UFmK_R',
      callbackURL: 'http://localhost:3000/auth/google/callback',
      passReqToCallback: true,
      scope: ['profile'],
    });
  }

  async validate(req: any, accessToken: string, refreshToken: string, profile, done: (error, data) => void) {
    try {
      console.log(profile);

      const jwt: string = await this.authService.validateOAuthLogin(profile.id, Provider.GOOGLE);
      const user = { jwt };

      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
}
