import { Inject, Injectable } from '@nestjs/common';
import { RepositoriesAbstract } from 'common/abstract/repositories.abstract';
import { AccountEntity } from 'entities/wallet/account.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { CreateAccountDto } from '../dto/create-account.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { PostgresConstant } from '../../../../common/constants/postgres.constant';
import { Paginated, paginate, FilterOperator } from 'nestjs-paginate';
import { PaginationQueryDto } from 'common/pagination/pagination-query.dto';

@Injectable()
export class AccountRepository
  extends Repository<AccountEntity>
  implements
    RepositoriesAbstract<AccountEntity, CreateAccountDto, UpdateAccountDto>
{
  constructor(
    @Inject(PostgresConstant) private postgresDataSource: DataSource,
  ) {
    super(AccountEntity, postgresDataSource.createEntityManager());
  }
  async createEntity(
    createEntityDto: CreateAccountDto,
  ): Promise<AccountEntity> {
    return await this.save(this.create(createEntityDto));
  }
  async updateEntity(
    id: string,
    updateEntityDto: UpdateAccountDto,
  ): Promise<UpdateResult> {
    return await this.update(id, updateEntityDto);
  }
  async findOneEntity(id: string): Promise<AccountEntity> {
    return await this.createQueryBuilder('account')
      .where('account.id=:id_account', { id_account: id })
      .getOne();
  }
  async findAllEntities(): Promise<AccountEntity[]> {
    return await this.createQueryBuilder('account').getMany();
  }

  async accountPagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<AccountEntity>> {
    return paginate(query, this, {
      sortableColumns: ['create_at'],
      nullSort: 'last',
      searchableColumns: ['account'],
      defaultSortBy: [['create_at', 'DESC']],
      filterableColumns: {
        account: [FilterOperator.ILIKE],
        iban: [FilterOperator.ILIKE],
      },
    });
  }
}
