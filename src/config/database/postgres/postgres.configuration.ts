import { registerAs } from '@nestjs/config';

export default registerAs('postgres', () => ({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  username: process.env.PG_USERNAME,
  database: process.env.PG_DATABASE,
  synchronize: process.env.PG_SYNCHRONIZE,
  password: process.env.PG_PASSWORD,
}));
