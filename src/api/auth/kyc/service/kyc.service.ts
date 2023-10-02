import { Injectable } from '@nestjs/common';
import { CreateKycDto } from '../dto/create-kyc.dto';
import { KycEntity } from 'src/entities/auth/kyc.entity';
import { KycRepository } from '../repositories/kyc.repository';
import { UserRepository } from '../../user/repositories/user.repository';
import { UserService } from '../../user/service/user.service';
import { Paginated } from 'nestjs-paginate';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';

@Injectable()
export class KycService {
  constructor(
    private kycRepository: KycRepository,
    private userService: UserService,
  ) {}

  async createEntity(createEntityDto: CreateKycDto): Promise<KycEntity> {
    const findUser = await this.userService.findOneEntity(
      createEntityDto.user_id,
    );
    createEntityDto.user = findUser;
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

  async kycPagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<KycEntity>> {
    return this.kycRepository.kycPagination(query);
  }
}
