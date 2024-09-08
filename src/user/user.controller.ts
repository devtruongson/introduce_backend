import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { registerDTO } from './dto/register.dt';
import { loginDTO } from './dto/login.dt';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    registerAdmin(@Body() data: registerDTO) {
        return this.userService.register(data);
    }

    @Post('login')
    loginAdmin(@Body() data: loginDTO) {
        return this.userService.login(data);
    }
}
