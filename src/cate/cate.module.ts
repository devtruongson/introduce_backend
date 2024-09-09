import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CateService } from './cate.service';
import { CateController } from './cate.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cate, CateSchema } from 'src/schemas/cate.schema';
import { UserModule } from 'src/user/user.module';
import { JwtMiddleware } from 'src/middlewares/jwt_admin_access.m';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: Cate.name,
                useFactory: () => {
                    const schema = CateSchema;
                    return schema;
                },
            },
        ]),
        UserModule,
    ],
    controllers: [CateController],
    providers: [CateService],
})
export class CateModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(JwtMiddleware).forRoutes({
            path: '/cate',
            method: RequestMethod.POST,
        });
    }
}
