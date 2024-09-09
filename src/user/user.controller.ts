import { Body, Controller, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
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

    @Post('logout')
    logout(@Body() data: { _id: string }, @Req() req: Request) {
        const access_token = req.headers?.authorization?.split(' ')?.length
            ? req.headers?.authorization?.split(' ')[1]
            : '';

        return this.userService.logout(access_token, data._id);
    }
}
