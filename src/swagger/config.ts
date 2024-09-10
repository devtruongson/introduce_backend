import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const SwaggerConfig = (app: INestApplication) => {
    const config = new DocumentBuilder()
        .setTitle('Introduce API Document')
        .setDescription(
            'Phiên bản 1 của API "Introduce" cho phép người dùng gửi thông tin giới thiệu về bản thân hoặc một đối tượng cụ thể. Đây là một thử nghiệm ban đầu, nhằm thu thập phản hồi và kiểm tra tính năng của API.',
        )
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/document', app, document);
};
