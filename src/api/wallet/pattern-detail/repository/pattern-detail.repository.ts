import { Inject, Injectable } from '@nestjs/common';
import { Paginated, paginate, FilterOperator } from 'nestjs-paginate';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { PatternDetailEntity } from 'src/entities/WALLET/pattern-detail.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { RepositoriesAbstract } from '../../../../common/abstract/repositories.abstract';
import { PostgresConstant } from '../../../../common/constants/postgres.constant';
import { CreatePatternDetailDto } from '../dto/create-pattern-detail.dto';
import { UpdatePatternDetailDto } from '../dto/update-pattern-detail.dto';

@Injectable()
export class PatternDetailRepository
  extends Repository<PatternDetailEntity>
  implements
    RepositoriesAbstract<
      PatternDetailEntity,
      CreatePatternDetailDto,
      UpdatePatternDetailDto
    >
{
  constructor(
    @Inject(PostgresConstant) private postgresDataSource: DataSource,
  ) {
    super(PatternDetailEntity, postgresDataSource.createEntityManager());
  }

  async createEntity(
    createEntityDto: CreatePatternDetailDto,
  ): Promise<PatternDetailEntity> {
    return await this.save(this.create(createEntityDto));
  }

  async findAllEntities(): Promise<PatternDetailEntity[]> {
    return await this.createQueryBuilder('pattern-detail').getMany();
  }

  async findOneEntity(id: string): Promise<PatternDetailEntity> {
    return await this.createQueryBuilder('pattern-detail')
      .where('pattern-detail.id=:pattern_detail_id', { pattern_detail_id: id })
      .getOne();
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdatePatternDetailDto,
  ): Promise<UpdateResult> {
    return await this.update(id, updateEntityDto);
  }

  async patternDetailPagination(query:PaginationQueryDto):Promise<Paginated<PatternDetailEntity>>{
    return paginate(query, this, {
      sortableColumns: ['create_at'],
      nullSort: 'last',
      defaultSortBy: [['create_at', 'DESC']]
    })
  }
}
