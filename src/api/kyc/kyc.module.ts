import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KycService } from './service/kyc.service';
import { KycController } from './controller/kyc.controller';
import { KycEntity } from '../../entities/AUTH/kyc.entity';

@Module({
  imports: [TypeOrmModule.forFeature([KycEntity])],
  controllers: [KycController],
  providers: [KycService],
  exports: [KycService],
})
export class KycModule {}
