import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LoginRegisterHsitoryDocument =
  HydratedDocument<LoginRegisterHsitory>;

@Schema({ timestamps: true })
export class LoginRegisterHsitory {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  access_token: string;

  @Prop({ required: true })
  user: string;

  @Prop({ required: true })
  roles: [string];

  @Prop({ required: true })
  otpCode: string;
}
export const LoginRegisterHsitorySchema =
  SchemaFactory.createForClass(LoginRegisterHsitory);
