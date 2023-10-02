import { Inject } from '@nestjs/common';
import { paginate, Paginated } from 'nestjs-paginate';
import { RepositoriesAbstract } from 'common/abstract/repositories.abstract';
import { PostgresConstant } from 'common/constants/postgres.constant';
import { PaginationQueryDto } from 'common/pagination/pagination-query.dto';
import { SummaryEntity } from 'entities/inventory/summary.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { CreateSummaryDto } from '../dto/create-summary.dto';
import { UpdateSummaryDto } from '../dto/update-summary.dto';

export class SummaryRepository
  extends Repository<SummaryEntity>
  implements
    RepositoriesAbstract<SummaryEntity, CreateSummaryDto, UpdateSummaryDto>
{
  constructor(
    @Inject(PostgresConstant) private postgresDataSource: DataSource,
  ) {
    super(SummaryEntity, postgresDataSource.createEntityManager());
  }

  async createEntity(
    createEntityDto: CreateSummaryDto,
  ): Promise<SummaryEntity> {
    return await this.save(this.create(createEntityDto));
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdateSummaryDto,
  ): Promise<UpdateResult> {
    return await this.update(id, updateEntityDto);
  }

  async findAllEntities(): Promise<SummaryEntity[]> {
    return await this.createQueryBuilder('summary').getMany();
  }

  async findByEntity(searchTerm: string): Promise<SummaryEntity> {
    return await this.createQueryBuilder('summary')
      .where(
        `summary.description = :searchTerm OR summary.count = :count OR summary.minimum = :minimum OR summary.unit = :unit`,
        {
          searchTerm,
        },
      )
      .getOne();
  }

  async findOneEntity(summaryId: string): Promise<SummaryEntity> {
    return await this.createQueryBuilder('summary')
      .where('summary.id = :summaryId', {
        summaryId,
      })
      .getOne();
  }

  async summaryPagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<SummaryEntity>> {
    return paginate(query, this, {
      sortableColumns: ['create_at'],
      nullSort: 'last',
      defaultSortBy: [['create_at', 'DESC']],
    });
  }
}
