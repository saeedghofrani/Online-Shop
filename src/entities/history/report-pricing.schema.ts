import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { PricingEntity } from "../WALLET/pricing.entity";

export type ReportPricingHistoryDocument = HydratedDocument<ReportPricingHistory>;

@Schema({ timestamps: true })
export class ReportPricingHistory {
  @Prop({ required: true })
  price: string;

  @Prop({ required: true })
  pricing: PricingEntity;
}
export const ReportPricingHistorySchema = SchemaFactory.createForClass(ReportPricingHistory);