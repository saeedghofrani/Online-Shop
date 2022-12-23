import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateKycDto } from '../dto/create.kyc.dto';
import { KycEntity } from 'src/entities/AUTH/kyc.entity';

@Injectable()
export class KycService {
  constructor(
    @InjectRepository(KycEntity)
    private kycRepository: Repository<KycEntity>,
  ) {}

  async createEntity(createEntityDto: CreateKycDto): Promise<KycEntity> {
    return await this.kycRepository.save(
      this.kycRepository.create(createEntityDto),
    );
  }

  async findAllEntities(): Promise<KycEntity[]> {
    return await this.kycRepository.createQueryBuilder('kyc').getMany();
  }

  async findByEntity(searchTerm: string): Promise<KycEntity> {
    return await this.kycRepository
      .createQueryBuilder('kyc')
      .where(
        `kyc.father_name = :searchTerm OR kyc.birth_date = :searchTerm OR kyc.national_code = :searchTerm`,
        {
          searchTerm,
        },
      )
      .getOne();
  }

  async findOneEntity(kycId: string): Promise<KycEntity> {
    return await this.kycRepository
      .createQueryBuilder('kyc')
      .where('kyc.id = :kycId', {
        kycId,
      })
      .getOne();
  }
}
