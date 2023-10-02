import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ErrorHistoryDocument = HydratedDocument<ErrorHistory>;

@Schema({ timestamps: true })
export class ErrorHistory {
  @Prop({ required: true })
  status: number;

  @Prop({ required: true })
  error: string;

  @Prop({ required: true })
  route: string;

  @Prop({ required: true })
  path: string;

  @Prop({ required: true })
  methode: string;
}
export const ErrorHistorySchema = SchemaFactory.createForClass(ErrorHistory);
