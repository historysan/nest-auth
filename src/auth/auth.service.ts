import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

export enum Provider {
  GOOGLE = 'google',
}

@Injectable()
export class AuthService {
  private readonly JWT_SECRET_KEY = 'artqvaradzmurad';
  constructor(/* private readonly usersService: UsersService */) {}

  async validateOAuthLogin(thirdPartyId: string, provider: Provider): Promise<string> {
    try {
      const payload = { thirdPartyId, provider };

      const jwt: string = sign(payload, this.JWT_SECRET_KEY, { expiresIn: 360000 });

      return jwt;
    } catch (error) {
      throw new InternalServerErrorException('validateOAuthLogin', error.message);
    }
  }
}
