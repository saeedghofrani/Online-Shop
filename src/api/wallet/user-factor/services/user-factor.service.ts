import { Injectable } from '@nestjs/common';
import { Paginated } from 'nestjs-paginate';
import { PaginationQueryDto } from 'common/pagination/pagination-query.dto';
import { UserFactorEntity } from '../../../../entities/wallet/user-factor.entity';
import { PatternMasterService } from '../../pattern-master/service/pattern-master.service';
import { CreateUserFactorDto } from '../dto/create-user-factor.dto';
import { UserFactorRepositories } from '../repositories/user-factor.repositories';

@Injectable()
export class UserFactorService {
  constructor(
    private userFactorRepository: UserFactorRepositories,
    private patternMasterService: PatternMasterService,
  ) {}
  async createEntity(
    createEntityDto: CreateUserFactorDto,
    patterMasterId: string,
  ): Promise<UserFactorEntity> {
    const findPatterMaster = await this.patternMasterService.findOneEntity(
      patterMasterId,
    );
    if (!findPatterMaster) throw new Error();

    createEntityDto.pattern_master = findPatterMaster;
    return await this.userFactorRepository.createEntity(createEntityDto);
  }

  async findAllEntities(): Promise<UserFactorEntity[]> {
    return await this.userFactorRepository.findAllEntities();
  }

  async findOneEntity(id: string): Promise<UserFactorEntity> {
    return await this.userFactorRepository.findOneEntity(id);
  }

  async userFactorPagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<UserFactorEntity>> {
    return this.userFactorRepository.userFactorPagination(query);
  }
}
