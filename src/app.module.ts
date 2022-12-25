import { Module } from '@nestjs/common';
import { ConfigurationModule } from './config/configuration.module';
import { RedisModule } from './utils/redis/redis.module';
import { LoggerModule } from './config/logger/logger.module';
import { UserModule } from './api/user/user.module';
import { dbConfig } from './config/database/typeorm/postgres/database';
import { SmsModule } from './utils/sms/sms.module';
import { EmailModule } from './utils/email/email.module';
import { PostgresModule } from './config/database/typeorm/postgres/postgres.module';

@Module({
  imports: [
    RedisModule.register({
      url: `redis://${process.env.REDIS_HOST}:${parseInt(
        process.env.REDIS_PORT,
      )}`,
    }),
    ConfigurationModule,
    LoggerModule,
    EmailModule,
    UserModule,
    PostgresModule.openConnection(dbConfig()),
    SmsModule,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
