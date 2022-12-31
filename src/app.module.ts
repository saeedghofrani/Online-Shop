import { Module } from '@nestjs/common';
import { ConfigurationModule } from './config/configuration.module';
import { RedisModule } from './utils/redis/redis.module';
import { LoggerModule } from './config/logger/logger.module';
import { dbConfig } from './config/database/typeorm/postgres/database';
import { SmsModule } from './utils/sms/sms.module';
import { EmailModule } from './utils/email/email.module';
import { PostgresModule } from './config/database/typeorm/postgres/postgres.module';
import { AuthModule } from './api/auth/auth.module';
import { InventoryModuel } from './api/inventory/inventory.module';
import { LocationModule } from './api/location/location.module';
import { MopngooseModule } from './config/database/mongoose/mongoose.module';

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
    MopngooseModule,
    LocationModule,
    InventoryModuel,
    AuthModule,
    PostgresModule.openConnection(dbConfig()),
    SmsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
