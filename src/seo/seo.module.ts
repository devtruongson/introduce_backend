import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { SeoService } from './seo.service';
import { SeoController } from './seo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Seo, SeoSchema } from 'src/schemas/seo.schema';
import { UserModule } from 'src/user/user.module';
import { JwtMiddleware } from 'src/middlewares/jwt_admin_access.m';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: Seo.name,
                useFactory: () => {
                    const schema = SeoSchema;
                    return schema;
                },
            },
        ]),
        UserModule,
    ],
    controllers: [SeoController],
    providers: [SeoService],
})
export class SeoModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(JwtMiddleware).forRoutes({
            path: '/seo',
            method: RequestMethod.POST,
        });
    }
}
