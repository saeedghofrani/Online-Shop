import { Inject, Injectable } from '@nestjs/common';
import { FilterOperator, Paginated, paginate } from 'nestjs-paginate';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { RepositoriesAbstract } from '../../../../common/abstract/repositories.abstract';
import { PostgresConstant } from '../../../../common/constants/postgres.constant';
import { WalletEntity } from '../../../../entities/WALLET/wallet.entity';
import { CreateWalletDto } from '../dto/create-wallet.dto';
import { UpdateWalletDto } from '../dto/update-wallet.dto';

@Injectable()
export class WalletRepository
  extends Repository<WalletEntity>
  implements
    RepositoriesAbstract<WalletEntity, CreateWalletDto, UpdateWalletDto>
{
  constructor(
    @Inject(PostgresConstant) private postgresDataSource: DataSource,
  ) {
    super(WalletEntity, postgresDataSource.createEntityManager());
  }

  async createEntity(createEntityDto: CreateWalletDto): Promise<WalletEntity> {
    return await this.save(this.create(createEntityDto));
  }

  async findAllEntities(): Promise<WalletEntity[]> {
    return await this.createQueryBuilder('wallet').getMany();
  }

  async findOneEntity(id: string): Promise<WalletEntity> {
    return await this.createQueryBuilder('wallet')
      .where('wallet.id=:id_wallet', { id_wallet: id })
      .getOne();
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdateWalletDto,
  ): Promise<UpdateResult> {
    return await this.update(id, updateEntityDto);
  }

  async walletPagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<WalletEntity>> {
    return paginate(query, this, {
      sortableColumns: ['create_at'],
      nullSort: 'last',
      searchableColumns: ['amount'],
      defaultSortBy: [['create_at', 'DESC']],
      filterableColumns: {
        amount: [FilterOperator.ILIKE],
      },
    });
  }
}
