import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from './swagger/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('/api/v1/');
    SwaggerConfig(app);
    app.use(cookieParser());
    await app.listen(process.env.PORT);
}
bootstrap();
