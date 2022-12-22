import { Inject, Injectable } from '@nestjs/common';
import { RedisConstant } from '../../common/constants/redis.constant';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  constructor(@Inject(RedisConstant) private redisManager: RedisClientType) {}

  async setKey(key: string, value: string, ttl?: number): Promise<void> {
    await this.redisManager.set(key, value, { EX: ttl });
  }

  async getKey(key: string): Promise<any> {
    return await this.redisManager.GET(key);
  }

  async getKeysByPatter(pattern: string): Promise<string[]> {
    return await this.redisManager.KEYS(pattern);
  }

  async getValuesByKeys(keys: string[]): Promise<any[]> {
    return await this.redisManager.mGet(keys);
  }
}
