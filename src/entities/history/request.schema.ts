import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserAgentClass } from 'common/classes/user-agent.class';

export type RequestHistoryDocument = HydratedDocument<RequestHistory>;

@Schema({ timestamps: true })
export class RequestHistory {
  @Prop({ required: true })
  is_authenticated: boolean;

  @Prop({ required: false })
  token: string;

  @Prop({ required: false })
  route: string;

  @Prop({ type: Object, required: false })
  data: Object;

  @Prop({ type: Object, required: false })
  query: Object;

  @Prop({ required: false })
  method: string;

  @Prop({ required: false })
  statusCode: number;

  @Prop({ required: false })
  contentLength: string;

  @Prop({ required: false })
  userAgent: UserAgentClass;

  @Prop({ required: false })
  ip: string;
}
export const RequestHistorySchema =
  SchemaFactory.createForClass(RequestHistory);
