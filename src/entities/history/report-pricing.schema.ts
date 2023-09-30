import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReportPricingHistoryDocument =
  HydratedDocument<ReportPricingHistory>;

@Schema({ timestamps: true })
export class ReportPricingHistory {
  @Prop({ required: true })
  price: string;

  @Prop({ required: true })
  pricing: any;
}
export const ReportPricingHistorySchema =
  SchemaFactory.createForClass(ReportPricingHistory);
