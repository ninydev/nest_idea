import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
import { UserModel } from '../users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(), // Импортируем ConfigModule для загрузки .env файла
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Импортируем ConfigModule для использования ConfigService
      inject: [ConfigService], // Инжектим ConfigService для доступа к переменным окружения
      useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
        type: 'mysql', // Тип базы данных (может отличаться в зависимости от используемой БД)
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT'), 10), // Порт базы данных (parseInt для преобразования строки в число)
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [UserModel], // Список сущностей для загрузки в TypeORM
        synchronize: true, // Автоматическая синхронизация схемы (не рекомендуется в production)
      }),
    }),
  ],
})
export class DbConfigModule {}
