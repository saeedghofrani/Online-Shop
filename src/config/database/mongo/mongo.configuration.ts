import { registerAs } from '@nestjs/config';

export default registerAs('mongo', () => ({
  host: process.env.MG_HOST,
  port: process.env.MG_PORT,
  database: process.env.MG_COLLECTION,
}));
