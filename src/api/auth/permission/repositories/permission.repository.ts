import { Inject, Injectable } from '@nestjs/common';
import { Paginated, paginate, FilterOperator } from 'nestjs-paginate';
import { RepositoriesAbstract } from 'common/abstract/repositories.abstract';
import { PostgresConstant } from 'common/constants/postgres.constant';
import { PaginationQueryDto } from 'common/pagination/pagination-query.dto';
import { PermissionEntity } from 'entities/auth/permission.entity';
import { DataSource, In, Repository, UpdateResult } from 'typeorm';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';

@Injectable()
export class PermissionRepository
  extends Repository<PermissionEntity>
  implements
    RepositoriesAbstract<
      PermissionEntity,
      CreatePermissionDto,
      UpdatePermissionDto
    >
{
  constructor(
    @Inject(PostgresConstant) private postgresDataSource: DataSource,
  ) {
    super(PermissionEntity, postgresDataSource.createEntityManager());
  }
  async createEntity(
    createEntityDto: CreatePermissionDto,
  ): Promise<PermissionEntity> {
    return await this.save(this.create(createEntityDto));
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdatePermissionDto,
  ): Promise<UpdateResult> {
    return await this.update(id, updateEntityDto);
  }

  async findAllEntities(): Promise<PermissionEntity[]> {
    return await this.createQueryBuilder('permission').getMany();
  }

  async findByEntity(searchTerm: string): Promise<PermissionEntity> {
    return await this.createQueryBuilder('permission')
      .where(`permission.name = :searchTerm`, {
        searchTerm,
      })
      .getOne();
  }

  async findOneEntity(permissionId: string): Promise<PermissionEntity> {
    return await this.createQueryBuilder('permission')
      .where('permission.id = :permissionId', {
        permissionId,
      })
      .getOne();
  }

  async findPermissionByIds(ids: string[]): Promise<PermissionEntity[]> {
    return await this.find({ where: { id: In(ids) } });
  }

  async permissionPagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<PermissionEntity>> {
    return paginate(query, this, {
      sortableColumns: ['id'],
      nullSort: 'last',
      searchableColumns: ['name'],
      defaultSortBy: [['id', 'DESC']],
      filterableColumns: {
        name: [FilterOperator.ILIKE],
      },
    });
  }
}
