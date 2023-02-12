import { registerAs } from '@nestjs/config';

export default registerAs('elastic', () => ({
  node: process.env.ES_NODE,
  username: process.env.ES_USERNAME,
  password: process.env.ES_PASSWORD,
}));
