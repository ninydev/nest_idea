import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import {SendEmailService} from "../notifications/email/send-email.service";
import {EventService} from "../events/event.service";
import {UserRegisteredListener} from "./listeners/user-registered.listener";

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, SendEmailService, EventService, UserRegisteredListener],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
