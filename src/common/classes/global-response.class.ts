import { Request } from 'express';
export class GlobalResponseClass {
  timestamp;
  data;
  route: string;

  constructor(req: any, response) {
    this.timestamp = new Date(Date.now());
    this.data = response;
    console.log(req);
  }
}
