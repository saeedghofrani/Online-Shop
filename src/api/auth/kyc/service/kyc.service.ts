import { Injectable } from '@nestjs/common';
import { CreateKycDto } from '../dto/create-kyc.dto';
import { KycEntity } from 'src/entities/AUTH/kyc.entity';
import { KycRepository } from '../repositories/kyc.repository';
import { UserRepository } from '../../user/repositories/user.repository';
import { UserService } from '../../user/service/user.service';

@Injectable()
export class KycService {
  constructor(private kycRepository: KycRepository,
    private userService:UserService) {}

  async createEntity(createEntityDto: CreateKycDto): Promise<KycEntity> {
    const findUser=await this.userService.findOneEntity(createEntityDto.user_id)
    createEntityDto.user=findUser
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
