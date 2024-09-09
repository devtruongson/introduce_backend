import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { HeaderService } from './header.service';
import { HeaderController } from './header.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Header, HeaderSchema } from 'src/schemas/header.schema';
import { JwtMiddleware } from 'src/middlewares/jwt_admin_access.m';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: Header.name,
                useFactory: () => {
                    const schema = HeaderSchema;
                    return schema;
                },
            },
        ]),
        UserModule,
    ],
    controllers: [HeaderController],
    providers: [HeaderService],
})
export class HeaderModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(JwtMiddleware).forRoutes(
            {
                path: '/header',
                method: RequestMethod.POST,
            },
            {
                path: '/header/one',
                method: RequestMethod.PUT,
            },
            {
                path: '/header/position',
                method: RequestMethod.PUT,
            },
        );
    }
}
