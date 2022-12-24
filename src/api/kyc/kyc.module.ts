import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KycService } from './service/kyc.service';
import { KycController } from './controller/kyc.controller';
import { KycEntity } from '../../entities/AUTH/kyc.entity';
import { KycRepository } from './repositories/kyc.repository';

@Module({
  imports: [TypeOrmModule.forFeature([KycEntity])],
  controllers: [KycController],
  providers: [KycService,KycRepository],
  exports: [KycService],
})
export class KycModule {}
