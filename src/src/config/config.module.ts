import { Module } from '@nestjs/common';
import { DbConfigModule } from './db.config';
import {MailConfigModule} from "./mail.config";

@Module({
  imports: [DbConfigModule, MailConfigModule],
})
export class ConfigModule {}
