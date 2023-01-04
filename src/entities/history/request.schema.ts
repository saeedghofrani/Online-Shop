import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type RequestHistoryDocument = HydratedDocument<RequestHistory>;

@Schema({ timestamps: true })
export class RequestHistory {
  @Prop({ required: true })
  is_authenticated: boolean;

  @Prop({ required: false })
  token: string;

  @Prop({ required: true })
  route: string;

  @Prop({ required: true })
  data: string;

  @Prop({ required: true })
  query: string;
}
export const RequestHistorySchema = SchemaFactory.createForClass(RequestHistory);
