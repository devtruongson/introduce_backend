import { HttpException, HttpStatus, Inject, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
import { IJwtPayload } from 'src/utils/jwt.dt';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(UserService) private readonly userService: UserService,
    ) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const access_token = authHeader.split(' ')[1].trim();

            if (!access_token) {
                throw new HttpException(
                    'Access_Token is a required parameter | Access_Token là tham số bắt buộc!',
                    HttpStatus.UNAUTHORIZED,
                );
            }

            try {
                // Verify the token
                const checkAccessToken: IJwtPayload = await this.jwtService.verifyAsync(access_token);
                req.body.user_payload = checkAccessToken;
                req.body.access_token = access_token;

                if (!checkAccessToken.is_admin) {
                    throw new Error('Tài khoản của bạn không đủ quền truy cập!');
                }

                // Check if the token is valid in the database
                const isValidDB = await this.userService.getUserByAccessToken(access_token, checkAccessToken._id);
                if (isValidDB && isValidDB.is_admin) {
                    next();
                } else {
                    throw new Error(
                        'Tài khoản của bạn đang sử dụng token không hợp lệ hoặc đang sử dụng token của một tài khoản khác',
                    );
                }
            } catch (error) {
                throw new HttpException(
                    error.message
                        ? error.message
                        : 'Your access_token has expired, please try again later | Access_token của bạn đã hết hạn vui lòng thử lại sau!',
                    HttpStatus.UNAUTHORIZED,
                );
            }
        } else {
            throw new UnauthorizedException();
        }
    }
}
