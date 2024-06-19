import { Module } from '@nestjs/common';
import { DbConfigModule } from './db.config';

@Module({
  imports: [DbConfigModule],
})
export class ConfigModule {}
