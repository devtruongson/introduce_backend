import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { JwtMiddleware } from './middlewares/jwt_admin_access.m';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('/api/v1/');
    app.use(cookieParser());
    await app.listen(process.env.PORT);
}
bootstrap();
