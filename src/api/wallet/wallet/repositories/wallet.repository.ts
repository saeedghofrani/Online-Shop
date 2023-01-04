import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { WalletEntity } from '../../../../entities/WALLET/wallet.entity';
import { RepositoriesAbstract } from '../../../../common/abstract/repositories.abstract';
import { CreateWalletDto } from '../dto/create-wallet.dto';
import { UpdateWalletDto } from '../dto/update-wallet.dto';
import { PostgresConstant } from '../../../../common/constants/postgres.constant';
import { PricingEntity } from '../../../../entities/WALLET/pricing.entity';

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
}
