import { join } from 'path';
import { DataSourceOptions } from 'typeorm';

export const dbConfig = (): DataSourceOptions => ({
  type: 'postgres',
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT, 10) || 5432,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  ssl: process.env.PG_SSL === 'true',
  synchronize: process.env.PG_SYNCHRONIZE === 'true',
  dropSchema: false,
  migrationsRun: false,
  logging: true,
  logger: 'file',
  migrations: [join(__dirname, '../migrations/**/*{.ts,.js}')],
  entities: ['dist/**/*.entity.js', '**/*.entity.js'],
  cache: {
    type: 'redis',
    tableName: 'cache',
    ignoreErrors: true,
    duration: 2000,
    alwaysEnabled: true,
    options: {
      host: "localhost",
      port: 6379
    }
  },
  extra: {
    max: 10,
    connectionTimeoutMillis: 2000
  }
});

// readonly cache?: boolean | {
//   /**
//    * Type of caching.
//    *
//    * - "database" means cached values will be stored in the separate table in database. This is default value.
//    * - "redis" means cached values will be stored inside redis. You must provide redis connection options.
//    */
//   readonly type?: "database" | "redis" | "ioredis" | "ioredis/cluster";
//   /**
//    * Factory function for custom cache providers that implement QueryResultCache.
//    */
//   readonly provider?: (connection: DataSource) => QueryResultCache;
//   /**
//    * Configurable table name for "database" type cache.
//    * Default value is "query-result-cache"
//    */
//   readonly tableName?: string;
//   /**
//    * Used to provide redis connection options.
//    */
//   readonly options?: any;
//   /**
//    * If set to true then queries (using find methods and QueryBuilder's methods) will always be cached.
//    */
//   readonly alwaysEnabled?: boolean;
//   /**
//    * Time in milliseconds in which cache will expire.
//    * This can be setup per-query.
//    * Default value is 1000 which is equivalent to 1 second.
//    */
//   readonly duration?: number;
//   /**
//    * Used to specify if cache errors should be ignored, and pass through the call to the Database.
//    */
//   readonly ignoreErrors?: boolean;
// };
export default dbConfig;
