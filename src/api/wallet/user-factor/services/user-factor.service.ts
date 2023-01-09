import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { UserFactorEntity } from '../../../../entities/WALLET/user-factor.entity';
import { RepositoriesAbstract } from '../../../../common/abstract/repositories.abstract';
import { CreateUserFactorDto } from '../dto/create-user-factor.dto';
import { UpdateUserFactorDto } from '../dto/update-user-factor.dto';
import { UserFactorRepositories } from '../repositories/user-factor.repositories';
import { PatternMasterService } from '../../pattern-master/service/pattern-master.service';

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
}
