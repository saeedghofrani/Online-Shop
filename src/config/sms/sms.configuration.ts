import { registerAs } from '@nestjs/config';

export default registerAs('sms', () => ({
  api_key: process.env.SMS_API_KEY,
  url: process.env.SMS_URL,
  template: process.env.SMS_TEMPLATE,
}));
