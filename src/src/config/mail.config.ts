import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(), // Импортируем ConfigModule и настраиваем его
        MailerModule.forRootAsync({
            imports: [ConfigModule], // Импортируем ConfigModule в MailerModule.forRootAsync
            useFactory: async (configService: ConfigService) => ({
                transport: {
                    host: configService.get('MAIL_HOST'),
                    port: parseInt(configService.get('MAIL_PORT')),
                    secure: configService.get('MAIL_ENCRYPTION') === 'tls', // Пример как можно использовать MAIL_ENCRYPTION
                    auth: {
                        user: configService.get('MAIL_USERNAME'),
                        pass: configService.get('MAIL_PASSWORD'),
                    },
                },
                defaults: {
                    from: `"${configService.get('MAIL_FROM_NAME')}" <${configService.get('MAIL_FROM_ADDRESS')}>`,
                },
            }),
            inject: [ConfigService], // Внедряем ConfigService для получения значений конфигурации
        }),
    ],
})
export class MailConfigModule {}