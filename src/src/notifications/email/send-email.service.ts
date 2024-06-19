import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class SendEmailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendEmail(to: string, subject: string, text: string): Promise<void> {
        await this.mailerService.sendMail({
            to,
            subject,
            text,
        });
    }
}