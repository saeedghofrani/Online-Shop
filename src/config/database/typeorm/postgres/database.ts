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
});

export default dbConfig;
