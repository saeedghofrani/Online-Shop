import { Injectable } from '@nestjs/common';
import { sendRequest } from '../request.utils';

@Injectable()
export class SmsService {
  apiKey = process.env.SMS_API_KEY;
  url = process.env.SMS_URL;
  template = process.env.SMS_TEMPLATE;

  // async sendOtp(code: string, receptor: string): Promise<boolean> {
  //   const data = {
  //     receptor,
  //     type: 1,
  //     template: this.template,
  //     param1: code,
  //   };

  // const headers = {
  //   apiKey: this.apiKey,
  //   'Content-Type': 'application/x-www-form-urlencoded',
  // };

  // const result = await sendRequest('post', headers, this.url, data);
  // return result && result.status == 200;
  // }
}
