import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ProductEntity } from '../product/product.entity';

export type ReportOrderHistoryDocument = HydratedDocument<ReportOrderHistory>;

@Schema({ timestamps: true })
export class ReportOrderHistory {
  @Prop({ required: true })
  user: string;

  @Prop({ required: true })
  pricing: string;

  @Prop({ required: true })
  price: string;

  @Prop({ required: true })
  product: ProductEntity;
}
export const ReportOrderHistorySchema =
  SchemaFactory.createForClass(ReportOrderHistory);
