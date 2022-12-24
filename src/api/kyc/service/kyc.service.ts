import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateKycDto } from '../dto/create-kyc.dto';
import { KycEntity } from 'src/entities/AUTH/kyc.entity';
import { KycRepository } from '../repositories/kyc.repository';

@Injectable()
export class KycService {
  constructor(private kycRepository: KycRepository) {}

  async createEntity(createEntityDto: CreateKycDto): Promise<KycEntity> {
    return await this.kycRepository.createEntity(createEntityDto);
  }

  async findAllEntities(): Promise<KycEntity[]> {
    return await this.kycRepository.findAllEntities();
  }

  async findByEntity(searchTerm: string): Promise<KycEntity> {
    return await this.kycRepository.findByEntity(searchTerm);
  }

  async findOneEntity(kycId: string): Promise<KycEntity> {
    return await this.kycRepository.findOneEntity(kycId);
  }
}
