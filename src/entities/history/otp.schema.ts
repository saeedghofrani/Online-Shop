import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OtpHistoryDocument = HydratedDocument<OtpHistory>;

@Schema({ timestamps: true })
export class OtpHistory {
  @Prop({ required: true })
  user: string;
}
export const OtpHistorySchema = SchemaFactory.createForClass(OtpHistory);
