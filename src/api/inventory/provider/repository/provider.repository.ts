import { Inject } from '@nestjs/common';
import { FilterOperator, paginate, Paginated } from 'nestjs-paginate';
import { RepositoriesAbstract } from 'common/abstract/repositories.abstract';
import { PostgresConstant } from 'common/constants/postgres.constant';
import { PaginationQueryDto } from 'common/pagination/pagination-query.dto';
import { ProviderEntity } from 'entities/inventory/provider.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { CreateProviderDto } from '../dto/create-provider.dto';
import { UpdateProviderStatusDto } from '../dto/update-provider-status.dto';
import { UpdateProviderDto } from '../dto/update-provider.dto';

export class ProviderRepository
  extends Repository<ProviderEntity>
  implements
    RepositoriesAbstract<ProviderEntity, CreateProviderDto, UpdateProviderDto>
{
  constructor(
    @Inject(PostgresConstant) private postgresDataSource: DataSource,
  ) {
    super(ProviderEntity, postgresDataSource.createEntityManager());
  }

  async createEntity(
    createEntityDto: CreateProviderDto,
  ): Promise<ProviderEntity> {
    return await this.save(this.create(createEntityDto));
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdateProviderDto,
  ): Promise<UpdateResult> {
    return await this.update(id, updateEntityDto);
  }

  async findAllEntities(): Promise<ProviderEntity[]> {
    return await this.createQueryBuilder('provider').getMany();
  }

  async findDefault(): Promise<ProviderEntity> {
    return await this.createQueryBuilder('provider').getOne();
  }

  async findByEntity(searchTerm: string): Promise<ProviderEntity> {
    return await this.createQueryBuilder('provider')
      .where(
        `provider.latitude = :latitude OR provider.longitude = :longitude OR provider.status = :status`,
        {
          searchTerm,
        },
      )
      .getOne();
  }

  async findOneEntity(providerId: string): Promise<ProviderEntity> {
    return await this.createQueryBuilder('provider')
      .where('provider.id = :providerId', {
        providerId,
      })
      .getOne();
  }

  async UpdateProviderStatus(
    providerId: string,
    updateProviderStatusDto: UpdateProviderStatusDto,
  ): Promise<UpdateResult> {
    return await this.update(providerId, updateProviderStatusDto);
  }

  async providerPagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<ProviderEntity>> {
    return paginate(query, this, {
      sortableColumns: ['create_at'],
      nullSort: 'last',
      searchableColumns: ['latitude', 'longitude'],
      defaultSortBy: [['create_at', 'DESC']],
      filterableColumns: {
        latitude: [FilterOperator.BTW],
        longitude: [FilterOperator.BTW],
      },
    });
  }
}
