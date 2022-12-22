import { DynamicModule, Module } from '@nestjs/common';
import { RedisManagerOptions } from './redis.options.interface';
import { RedisConstant } from '../../common/constants/redis.constant';
import { RedisService } from './redis.service';
import { createClient } from 'redis';

@Module({})
export class RedisModule {
  static register(
    redisManagerOptionsInterface: RedisManagerOptions,
  ): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        RedisService,
        {
          provide: RedisConstant,
          useFactory: async () => {
            const client = createClient(redisManagerOptionsInterface);
            await client.connect();
            return client;
          },
        },
      ],
      exports: [
        RedisService,
        {
          provide: RedisConstant,
          useFactory: async () => {
            const client = createClient(redisManagerOptionsInterface);
            await client.connect();
            return client;
          },
        },
      ],
      global: true,
    };
  }
}
