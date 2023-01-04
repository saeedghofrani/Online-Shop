import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OtpHsitoryDocument = HydratedDocument<OtpHsitory>;

@Schema({ timestamps: true })
export class OtpHsitory {
  @Prop({ required: true })
  user: string;
}
export const OtpHistorySchema = SchemaFactory.createForClass(OtpHsitory);
