import { Inject, Injectable } from '@nestjs/common';
import { Paginated, paginate, FilterOperator } from 'nestjs-paginate';
import { RepositoriesAbstract } from 'src/common/abstract/repositories.abstract';
import { PostgresConstant } from 'src/common/constants/postgres.constant';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { GroupEntity } from 'src/entities/PRODUCT/group.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';

@Injectable()
export class GroupRepository
  extends Repository<GroupEntity>
  implements RepositoriesAbstract<GroupEntity, CreateGroupDto, UpdateGroupDto>
{
  constructor(
    @Inject(PostgresConstant) private postgresDataSource: DataSource,
  ) {
    super(GroupEntity, postgresDataSource.createEntityManager());
  }

  async createEntity(createEntityDto: CreateGroupDto): Promise<GroupEntity> {
    return await this.save(this.create(createEntityDto));
  }
  async updateEntity(
    id: string,
    updateEntityDto: UpdateGroupDto,
  ): Promise<UpdateResult> {
    return await this.update(id, updateEntityDto);
  }
  async findOneEntity(id: string): Promise<GroupEntity> {
    return await this.createQueryBuilder('group')
      .where('group.id=:group_id', { group_id: id })
      .getOne();
  }
  async findAllEntities(): Promise<GroupEntity[]> {
    return await this.createQueryBuilder('group').getMany();
  }

  async groupPagination(query:PaginationQueryDto):Promise<Paginated<GroupEntity>>{
    return paginate(query, this, {
      sortableColumns: ['create_at'],
      nullSort: 'last',
      searchableColumns: ['name'],
      defaultSortBy: [['create_at', 'DESC']],
      filterableColumns: {
        name: [FilterOperator.ILIKE],
      },
    })
  }
}
