import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    
    //[POST] http://localhost:3000/user/
    //Cadastra um usuário
    @Post()
    registerUser(@Body() createUserDto: CreateUserDto) {
       return this.userService.registerUser(createUserDto);
    }
}
