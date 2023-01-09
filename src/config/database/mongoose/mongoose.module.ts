import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${process.env.MG_AUTH}@${process.env.MG_HOST}:${process.env.MG_PORT}/${process.env.MG_COLLECTION}?${process.env.MG_MECHANISM}`,
      // 'mongodb://127.0.0.1:27017/admin'
    ),
  ],
})
export class MopngooseModule {}
