import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../user/users.service';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && password === user.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const payload = { email: user.email, sub: user._id };
    return this.jwtService.sign(payload);
  }
}
