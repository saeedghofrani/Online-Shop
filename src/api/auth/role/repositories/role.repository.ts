import { Inject, Injectable } from '@nestjs/common';
import { FilterOperator, paginate, Paginated } from 'nestjs-paginate';
import { RepositoriesAbstract } from 'common/abstract/repositories.abstract';
import { PostgresConstant } from 'common/constants/postgres.constant';
import { PaginationQueryDto } from 'common/pagination/pagination-query.dto';
import { RoleEntity } from 'entities/auth/role.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { In } from 'typeorm/find-options/operator/In';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';

@Injectable()
export class RoleRepository
  extends Repository<RoleEntity>
  implements RepositoriesAbstract<RoleEntity, CreateRoleDto, UpdateRoleDto>
{
  constructor(
    @Inject(PostgresConstant) private postgresDatasource: DataSource,
  ) {
    super(RoleEntity, postgresDatasource.createEntityManager());
  }

  async createEntity(createEntityDto: CreateRoleDto): Promise<RoleEntity> {
    return await this.save(this.create(createEntityDto));
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdateRoleDto,
  ): Promise<UpdateResult> {
    return await this.update(id, updateEntityDto);
  }

  async findOneEntity(roleId: string): Promise<RoleEntity> {
    return await this.createQueryBuilder('role')
      .where('role.id = :roleId', {
        roleId,
      })
      .getOne();
  }

  async findByEntity(searchTerm: string): Promise<RoleEntity> {
    return await this.createQueryBuilder('role')
      .where(`role.name = :searchTerm`, {
        searchTerm,
      })
      .getOne();
  }

  async findAllEntities(): Promise<RoleEntity[]> {
    return await this.createQueryBuilder('role').getMany();
  }

  async getRoleDefault(): Promise<RoleEntity> {
    return await this.createQueryBuilder('role').where('role.default').getOne();
  }

  async findRolesByIds(ids: string[]): Promise<RoleEntity[]> {
    return await this.find({ where: { id: In(ids) } });
  }

  async rolePagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<RoleEntity>> {
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

  async addPermissionToUser() {}
}
