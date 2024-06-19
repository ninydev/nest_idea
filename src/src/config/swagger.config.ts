import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
    const swaggerConfig = new DocumentBuilder()
        .setTitle('NestJS Swagger API')
        .setDescription('API Documentation for NestJS Application')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs/api', app, document);
}