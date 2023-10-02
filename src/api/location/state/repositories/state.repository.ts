import { Inject, Injectable } from '@nestjs/common';
import { Paginated, paginate, FilterOperator } from 'nestjs-paginate';
import { RepositoriesAbstract } from 'common/abstract/repositories.abstract';
import { PostgresConstant } from 'common/constants/postgres.constant';
import { PaginationQueryDto } from 'common/pagination/pagination-query.dto';
import { StateEntity } from 'entities/location/state.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { CreateStateDto } from '../dto/create-state.dto';
import { UpdateStateDto } from '../dto/update-state.dto';

@Injectable()
export class StateRepository
  extends Repository<StateEntity>
  implements RepositoriesAbstract<StateEntity, CreateStateDto, UpdateStateDto>
{
  constructor(
    @Inject(PostgresConstant) private postgresDataSource: DataSource,
  ) {
    super(StateEntity, postgresDataSource.createEntityManager());
  }

  async createEntity(createEntityDto: CreateStateDto): Promise<StateEntity> {
    return await this.save(this.create(createEntityDto));
  }
  async updateEntity(
    id: string,
    updateEntityDto: UpdateStateDto,
  ): Promise<UpdateResult> {
    return await this.update(id, updateEntityDto);
  }
  async findOneEntity(id: string): Promise<StateEntity> {
    return await this.createQueryBuilder('state')
      .where('state.id=:state_id', { state_id: id })
      .getOne();
  }
  async findAllEntities(): Promise<StateEntity[]> {
    return await this.createQueryBuilder('state').getMany();
  }

  async statePagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<StateEntity>> {
    return paginate(query, this, {
      sortableColumns: ['create_at'],
      nullSort: 'last',
      searchableColumns: ['name'],
      defaultSortBy: [['create_at', 'DESC']],
      filterableColumns: {
        name: [FilterOperator.ILIKE],
      },
    });
  }
}
