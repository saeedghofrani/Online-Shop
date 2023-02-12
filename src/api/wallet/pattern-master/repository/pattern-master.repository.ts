import { Inject, Injectable } from '@nestjs/common';
import { Paginated, paginate, FilterOperator } from 'nestjs-paginate';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { PatternMasterEntity } from 'src/entities/WALLET/pattern-master.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { RepositoriesAbstract } from '../../../../common/abstract/repositories.abstract';
import { PostgresConstant } from '../../../../common/constants/postgres.constant';
import { CreatePatternMasterDto } from '../dto/create-pattern-master.dto';
import { UpdatePatternMasterDto } from '../dto/update-pattern-master.dto';

@Injectable()
export class PatternMasterRepository
  extends Repository<PatternMasterEntity>
  implements
    RepositoriesAbstract<
      PatternMasterEntity,
      CreatePatternMasterDto,
      UpdatePatternMasterDto
    >
{
  constructor(
    @Inject(PostgresConstant) private postgresDataSource: DataSource,
  ) {
    super(PatternMasterEntity, postgresDataSource.createEntityManager());
  }

  async createEntity(
    createEntityDto: CreatePatternMasterDto,
  ): Promise<PatternMasterEntity> {
    return await this.save(this.create(createEntityDto));
  }

  async findAllEntities(): Promise<PatternMasterEntity[]> {
    return await this.createQueryBuilder('pattern-master').getMany();
  }

  async findOneEntity(id: string): Promise<PatternMasterEntity> {
    return await this.createQueryBuilder('pattern-master')
      .where('pattern-master.id=:pattern_master_id', { pattern_master_id: id })
      .getOne();
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdatePatternMasterDto,
  ): Promise<UpdateResult> {
    return await this.update(id, updateEntityDto);
  }

  async patternMasterPagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<PatternMasterEntity>> {
    return paginate(query, this, {
      sortableColumns: ['create_at'],
      nullSort: 'last',
      defaultSortBy: [['create_at', 'DESC']],
    });
  }
}
