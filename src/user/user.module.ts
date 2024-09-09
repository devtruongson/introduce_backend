import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { JwtMiddlewareRefresh } from 'src/middlewares/jwt_admin_refresh.m';
import { JwtMiddleware } from 'src/middlewares/jwt_admin_access.m';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: User.name,
                useFactory: () => {
                    const schema = UserSchema;
                    return schema;
                },
            },
        ]),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(JwtMiddlewareRefresh)
            .forRoutes({
                path: '/user/refresh-token',
                method: RequestMethod.POST,
            })
            .apply(JwtMiddleware)
            .forRoutes({
                path: '/user',
                method: RequestMethod.PUT,
            });
    }
}
