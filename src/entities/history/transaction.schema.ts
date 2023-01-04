import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { ProductEntity } from "../product/product.entity";
import { TransactionStatusEnum } from "./enum/transaction-status.enum";
import { ProviderEntity } from "../inventory/provider.entity";

export type transactionHistoryDocument = HydratedDocument<transactionHistory>;

@Schema({ timestamps: true })
export class transactionHistory {
  @Prop({ required: true, type: 'enum', enum:  TransactionStatusEnum})
  user: TransactionStatusEnum;

  @Prop({ required: true })
  provider: ProviderEntity;

  @Prop({ required: true })
  product: ProductEntity;

  @Prop({ required: true })
  count: string;

  @Prop({ required: true })
  total: string;

  @Prop({ required: true })
  unit: string;
}
export const transactionHistorySchema = SchemaFactory.createForClass(transactionHistory);