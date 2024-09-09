import { HttpException, HttpStatus, Inject, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
import { IJwtPayload } from 'src/utils/jwt.dt';

@Injectable()
export class JwtMiddlewareRefresh implements NestMiddleware {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(UserService) private readonly userService: UserService,
    ) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const access_token = req.body.access_token?.trim();
        const refresh_token = req.body.refresh_token?.trim();
        const _id = req.body._id?.trim();

        if (access_token && refresh_token) {
            try {
                // Verify the token
                const [checkAccessToken, checkRefreshToken]: IJwtPayload[] = await Promise.all([
                    await this.jwtService.verifyAsync(access_token, {
                        ignoreExpiration: true,
                    }),
                    await this.jwtService.verifyAsync(refresh_token),
                ]);

                if (checkAccessToken._id !== checkRefreshToken._id) {
                    throw new Error('Access TOken & Refresh Token Không hợp lệ chúng không phải của một user!');
                }

                req.body.user_payload = checkAccessToken;
                req.body.access_token = access_token;
                req.body.refresh_token = access_token;

                if (!checkAccessToken.is_admin) {
                    throw new Error('Tài khoản của bạn không đủ quền truy cập!');
                }

                // Check if the token is valid in the database
                const isValidDB = await this.userService.getUserByAccessToken(access_token, _id);
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
