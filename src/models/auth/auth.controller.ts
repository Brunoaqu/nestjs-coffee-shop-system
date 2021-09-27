import { AuthService } from './auth.service';

import { Controller, Request, UseGuards, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    //[GET] http://localhost:3000/auth/login
    //Realiza login para acessar as rotas restritas
    @UseGuards(AuthGuard('local'))
    @Post("/login")
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}
