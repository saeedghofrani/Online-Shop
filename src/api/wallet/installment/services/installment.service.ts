import { Injectable } from '@nestjs/common';
import { Paginated } from 'nestjs-paginate';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { InstallmentEntity } from 'src/entities/WALLET/installment.entity';
import { UpdateResult } from 'typeorm';
import { PatternDetailService } from '../../pattern-detail/service/pattern-detail.service';
import { UserFactorService } from '../../user-factor/services/user-factor.service';
import { CreateInstallmentDto } from '../dto/create-installment.dto';
import { UpdateInstallmentDto } from '../dto/update-installment.dto';
import { InstallmentRepository } from '../repositories/installment.repository';

@Injectable()
export class InstallmentService {
  constructor(
    private installmentRepository: InstallmentRepository,
    private patternDetailService: PatternDetailService,
    private userFactorService: UserFactorService,
  ) {}
  async createEntity(
    createEntityDto: CreateInstallmentDto,
    pattern_detail_id: string,
    user_factor_id: string,
  ): Promise<InstallmentEntity> {
    try {
      createEntityDto.user_factor = await this.userFactorService.findOneEntity(
        user_factor_id,
      );
      createEntityDto.pattern_detail =
        await this.patternDetailService.findOneEntity(pattern_detail_id);
      return await this.installmentRepository.createEntity(createEntityDto);
    } catch (e) {}
  }
  async updateEntity(
    id: string,
    updateEntityDto: UpdateInstallmentDto,
    pattern_detail_id: string,
    user_factor_id: string,
  ): Promise<UpdateResult> {
    try {
      updateEntityDto.user_factor = await this.userFactorService.findOneEntity(
        user_factor_id,
      );
      updateEntityDto.pattern_detail =
        await this.patternDetailService.findOneEntity(pattern_detail_id);
      return await this.installmentRepository.updateEntity(id, updateEntityDto);
    } catch (e) {}
  }
  async findOneEntity(id: string): Promise<InstallmentEntity> {
    try {
      return await this.installmentRepository.findOneEntity(id);
    } catch (e) {}
  }
  async findAllEntities(): Promise<InstallmentEntity[]> {
    try {
      return await this.installmentRepository.findAllEntities();
    } catch (e) {}
  }

  async installmentPagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<InstallmentEntity>> {
    return this.installmentRepository.installmentPagination(query);
  }
}
