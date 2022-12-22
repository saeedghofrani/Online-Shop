import { Request } from 'express';
export class GlobalResponseClass {
  timestamp;
  data;
  route: string;

  constructor(req: Request, response) {
    this.timestamp = new Date().getDate();
    this.data = response;
    this.route = req.route;
  }
}
