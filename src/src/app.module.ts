import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';
import {EventModule} from "./events/event.module";

@Module({
  imports: [ConfigModule, AuthModule, UsersModule, EventModule],
})
export class AppModule {}
