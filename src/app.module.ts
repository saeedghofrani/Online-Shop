import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { ProductModule } from './api/product/product.module';
import { MopngooseModule } from './config/database/mongoose/mongoose.module';
import { RequestLoggerMiddleware } from './common/middlewares/request-logger.middleware';
import { HistoryModule } from './api/history/history.module';
import { WalletModule } from './api/wallet/wallet.module';
import { PublicModule } from './api/public/public.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    RedisModule.register({
      url: `redis://${process.env.REDIS_HOST}:${parseInt(
        process.env.REDIS_PORT,
      )}`,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'short',
          ttl: 1000,
          limit: 20,
        },
        {
          name: 'medium',
          ttl: 10000,
          limit: 150,
        },
        {
          name: 'long',
          ttl: 60000,
          limit: 300,
        },
      ],
    }),
    ConfigurationModule,
    LoggerModule,
    EmailModule,
    PublicModule,
    MopngooseModule,
    LocationModule,
    WalletModule,
    InventoryModuel,
    HistoryModule,
    AuthModule,
    PostgresModule.openConnection(dbConfig()),
    SmsModule,
    ProductModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
