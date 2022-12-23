import { Module } from '@nestjs/common';
import { ConfigurationModule } from './config/configuration.module';
import { RedisModule } from './utils/redis/redis.module';
import { LoggerModule } from './config/logger/logger.module';
import { UserModule } from './api/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/database/typeorm/postgres/database';
import { SmsModule } from './utils/sms/sms.module';
import { EmailModule } from './utils/email/email.module';
import { PostgresModule } from './config/database/typeorm/postgres/postgres.module';

@Module({
  imports: [
    ConfigurationModule,
    RedisModule,
    LoggerModule,
    PostgresModule,
    UserModule,
    TypeOrmModule.forRoot(dbConfig()),
    SmsModule,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
