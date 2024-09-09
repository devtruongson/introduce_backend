import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from './user/user.module';
import { SeoModule } from './seo/seo.module';
import { HeaderModule } from './header/header.module';
import { MessagerModule } from './messager/messager.module';
import { CateModule } from './cate/cate.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.URL_MONGO_DB),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '60s' },
        }),
        UserModule,
        SeoModule,
        HeaderModule,
        MessagerModule,
        CateModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
