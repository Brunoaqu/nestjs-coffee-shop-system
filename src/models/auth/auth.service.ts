import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/common/services/hash/hash.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, 
        private hashService: HashService,
        private jwtService: JwtService) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.getUserByUsername(email);
        if (user && await this.hashService.comparePassword(pass, user.password)) {
          return user;
        }
        return null;
      }

    async login(user: any) {
        const payload = { username: user.email, sub: user.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
