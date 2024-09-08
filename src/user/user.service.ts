import { BadRequestException, Injectable } from '@nestjs/common';
import { registerDTO } from './dto/register.dt';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { comparePassword, hashPassword } from './helpers/bcrypt';
import { IJwtPayload } from 'src/utils/jwt.dt';
import { loginDTO } from './dto/login.dt';

@Injectable()
export class UserService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async register(data: registerDTO) {
        const isUserExit = await this.userModel.findOne({
            email: data.email,
        });

        if (isUserExit) {
            throw new BadRequestException('Tài khoản đã có trong hệ thống!');
        }

        try {
            const passwordHash = await hashPassword(data.password);
            const userCreate = new this.userModel({
                ...data,
                password: passwordHash,
            });

            const tokens = await this.generateToken({
                _id: '' + userCreate._id,
                email: userCreate.email,
                is_admin: userCreate.is_admin,
                is_blocked: userCreate.is_blocked,
            });

            userCreate.tokens = [tokens];
            await userCreate.save();

            const userRes = userCreate.toObject();
            delete userRes.password;
            delete userRes.tokens;
            return {
                user: userRes,
                tokens,
            };
        } catch (error) {
            console.log(error);
            throw new BadRequestException(`Có lỗi xảy ra: ${error}`);
        }
    }

    async login(data: loginDTO) {
        const userExit = await this.userModel.findOne({
            email: data.email,
        });

        if (!userExit) {
            throw new BadRequestException('Tài khoản không có trong hệ thống!');
        }

        try {
            const isValidPassword = await comparePassword(data.password, userExit.password);

            if (!isValidPassword) {
                throw new BadRequestException('Sai mật khẩu!');
            }

            const tokens = await this.generateToken({
                _id: '' + userExit._id,
                email: userExit.email,
                is_admin: userExit.is_admin,
                is_blocked: userExit.is_blocked,
            });

            await this.userModel.findByIdAndUpdate(userExit._id, {
                tokens: [...userExit.tokens, tokens],
            });
            const userRes = userExit.toObject();
            delete userRes.password;
            delete userRes.tokens;
            return {
                user: userRes,
                tokens,
            };
        } catch (error) {
            console.log(error);
            throw new BadRequestException(`Có lỗi xảy ra: ${error}`);
        }
    }

    async generateToken(payload: IJwtPayload) {
        const dataPayload: IJwtPayload = {
            _id: payload._id,
            is_admin: payload.is_admin,
            is_blocked: payload.is_blocked,
            email: payload.email,
        };

        const access_token = await this.jwtService.signAsync(dataPayload, {
            expiresIn: '24h',
        });
        const refresh_token = await this.jwtService.signAsync(dataPayload, {
            expiresIn: '365d',
        });

        return {
            access_token,
            refresh_token,
        };
    }
}
