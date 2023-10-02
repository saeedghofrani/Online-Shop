import { UserAgentClass } from 'common/classes/user-agent.class';

export interface CreateRequestHistoryInterfece {
  is_authenticated: boolean;

  token: string;

  route: string;

  data: Object;

  query: Object;

  method: string;

  statusCode: number;

  contentLength: string;

  userAgent: UserAgentClass;

  ip: string;
}
