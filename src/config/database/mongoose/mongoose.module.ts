import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://hampa:HmpCo_2022_@192.168.10.200:27017/history?connectTimeoutMS=100000&authSource=admin&authMechanism=SCRAM-SHA-1',
      // 'mongodb://127.0.0.1:27017/admin'
    ),
  ],
})
export class MopngooseModule {}
