import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { UserAgentClass } from "src/common/classes/user-agent.class";

export type RequestHistoryDocument = HydratedDocument<RequestHistory>;

@Schema({ timestamps: true })
export class RequestHistory {
  @Prop({ required: true })
  is_authenticated: boolean;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  route: string;

  @Prop({type:Object, required: true })
  data: Object;

  @Prop({type:Object, required: true })
  query: Object;

  @Prop({ required: true })
  method: string;

  @Prop({ required: true })
  statusCode: number;

  @Prop({ required: true })
  contentLength: string;

  @Prop({ required: true })
  userAgent: UserAgentClass;

  @Prop({ required: true })
  ip: string;
}
export const RequestHistorySchema = SchemaFactory.createForClass(RequestHistory);
