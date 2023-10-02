import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { UserFactorEntity } from '../../../../entities/wallet/user-factor.entity';
import { RepositoriesAbstract } from '../../../../common/abstract/repositories.abstract';
import { CreateUserFactorDto } from '../dto/create-user-factor.dto';
import { UpdateUserFactorDto } from '../dto/update-user-factor.dto';
import { PostgresConstant } from '../../../../common/constants/postgres.constant';
import { Paginated, paginate, FilterOperator } from 'nestjs-paginate';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';

@Injectable()
export class UserFactorRepositories
  extends Repository<UserFactorEntity>
  implements
    RepositoriesAbstract<
      UserFactorEntity,
      CreateUserFactorDto,
      UpdateUserFactorDto
    >
{
  constructor(
    @Inject(PostgresConstant) private postgresDataSource: DataSource,
  ) {
    super(UserFactorEntity, postgresDataSource.createEntityManager());
  }

  async createEntity(
    createEntityDto: CreateUserFactorDto,
  ): Promise<UserFactorEntity> {
    return await this.save(this.create(createEntityDto));
  }

  async findAllEntities(): Promise<UserFactorEntity[]> {
    return await this.createQueryBuilder('user-factor').getMany();
  }

  async findOneEntity(id: string): Promise<UserFactorEntity> {
    return await this.createQueryBuilder('user-factor')
      .where('user-factor.id=:user_factor_id', { user_factor_id: id })
      .getOne();
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdateUserFactorDto,
  ): Promise<UpdateResult> {
    return await this.update(id, updateEntityDto);
  }

  async userFactorPagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<UserFactorEntity>> {
    return paginate(query, this, {
      sortableColumns: ['create_at'],
      nullSort: 'last',
      defaultSortBy: [['create_at', 'DESC']],
    });
  }
}
