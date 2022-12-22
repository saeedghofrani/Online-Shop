import {
  RedisClientOptions,
  RedisFunctions,
  RedisModules,
  RedisScripts,
} from '@redis/client';
export type RedisManagerOptions = RedisClientOptions<
  RedisModules,
  RedisFunctions,
  RedisScripts
>;
