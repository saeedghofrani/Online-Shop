import { Module } from '@nestjs/common';
import { ConfigurationModule } from './config/configuration.module';
import { RedisModule } from './utils/redis/redis.module';
import { LoggerModule } from './config/logger/logger.module';

@Module({
  imports: [ConfigurationModule, RedisModule, LoggerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
