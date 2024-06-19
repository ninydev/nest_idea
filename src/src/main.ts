import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {setupSwagger} from "./config/swagger.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Устанавливаем глобальный пайп для валидации
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // автоматически преобразовывать входные данные в соответствующие типы DTO
      whitelist: true, // игнорировать неизвестные поля в DTO
      forbidNonWhitelisted: true, // отклонять запросы, содержащие неизвестные поля
    }),
  );

  setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
