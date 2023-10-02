import { RepositoriesAbstract } from 'common/abstract/repositories.abstract';
import { UserEntity } from 'entities/auth/user.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { PostgresConstant } from 'common/constants/postgres.constant';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Paginated, paginate, FilterOperator } from 'nestjs-paginate';
import { PaginationQueryDto } from 'common/pagination/pagination-query.dto';
import { BrandEntity } from 'entities/product/brand.entity';

@Injectable()
export class UserRepository
  extends Repository<UserEntity>
  implements RepositoriesAbstract<UserEntity, CreateUserDto, UpdateUserDto>
{
  constructor(
    @Inject(PostgresConstant) private postgresDataSource: DataSource,
  ) {
    super(UserEntity, postgresDataSource.createEntityManager());
  }

  async createEntity(createEntityDto: CreateUserDto): Promise<UserEntity> {
    return await this.save(this.create(createEntityDto));
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.update(id, updateEntityDto);
  }

  async findOneEntity(id: string): Promise<UserEntity> {
    return await this.createQueryBuilder('user')
      .leftJoinAndSelect('user.kyc', 'kyc')
      .innerJoinAndSelect('user.roles', 'roles')
      .where('user.id = :userId', {
        userId: id,
      })
      .getOne();
  }

  async findAllEntities(): Promise<UserEntity[]> {
    return await this.createQueryBuilder('user').getMany();
  }

  async findByEntity(searchTerm: string): Promise<UserEntity> {
    return await this.createQueryBuilder('user')
      .innerJoinAndSelect('user.roles', 'roles')
      .addSelect('user.password')
      .where(`user.mobile = :searchTerm OR user.email = :searchTerm `, {
        searchTerm,
      })
      .getOne();
  }

  async userPagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<UserEntity>> {
    return paginate(query, this, {
      sortableColumns: ['create_at'],
      nullSort: 'last',
      searchableColumns: ['mobile', 'email'],
      defaultSortBy: [['create_at', 'DESC']],
      filterableColumns: {
        mobile: [FilterOperator.ILIKE],
        email: [FilterOperator.ILIKE],
      },
    });
  }
}
