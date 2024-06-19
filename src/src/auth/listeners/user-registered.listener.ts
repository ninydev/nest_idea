// user-registered.listener.ts
import { Injectable } from '@nestjs/common';
import {EventService} from "../../events/event.service";
import {SendEmailService} from "../../notifications/email/send-email.service";
import {UserRegisteredEvent} from "../events/user-registered.event";


@Injectable()
export class UserRegisteredListener {
    constructor(
        private readonly eventService: EventService,
        private readonly sendEmailService: SendEmailService,
    ) {
        this.registerListener();
    }

    private registerListener() {
        this.eventService.subscribeToEvent('user.registered',
            async (event: UserRegisteredEvent) => {
            const { user } = event;
            // Отправляем письмо пользователю
            await this.sendEmailService.sendEmail(
                user.email,
                'Welcome to Our Application',
                `Dear ${user.name},\n\nThank you for registering with us!`
            );
        });
    }
}
