import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfiguration from './app/app-configuration';
import elasticConfiguration from './database/elastic/elastic.configuration';
import mongoConfiguration from './database/mongo/mongo.configuration';
import postgresConfiguration from './database/postgres/postgres.configuration';
import redisConfiguration from './database/redis/redis.configuration';
import smsConfiguration from './sms/sms.configuration';
import swaggerConfiguration from './swagger/swagger.configuration';
import { AppConfigService } from './app/app-config.service';
import { getEnvPath } from '../common/helper/env.helper';
import { SwaggerConfigService } from './swagger/swagger.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvPath(),
      cache: true,
      load: [
        appConfiguration,
        elasticConfiguration,
        mongoConfiguration,
        postgresConfiguration,
        redisConfiguration,
        smsConfiguration,
        swaggerConfiguration,
      ],
    }),
  ],
  providers: [AppConfigService, SwaggerConfigService],
  exports: [AppConfigService, SwaggerConfigService],
})
export class ConfigurationModule {}
