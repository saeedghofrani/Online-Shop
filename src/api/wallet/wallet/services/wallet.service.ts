import { Injectable } from '@nestjs/common';
import { RepositoriesAbstract } from '../../../../common/abstract/repositories.abstract';
import { WalletEntity } from '../../../../entities/wallet/wallet.entity';
import { CreateWalletDto } from '../dto/create-wallet.dto';
import { UpdateWalletDto } from '../dto/update-wallet.dto';
import { UpdateResult } from 'typeorm';
import { WalletRepository } from '../repositories/wallet.repository';
import { UserService } from '../../../auth/user/service/user.service';
import { Paginated } from 'nestjs-paginate';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';

@Injectable()
export class WalletService {
  constructor(
    private walletRepository: WalletRepository,
    private userService: UserService,
  ) {}
  async createEntity(
    createEntityDto: CreateWalletDto,
    userId: string,
  ): Promise<WalletEntity> {
    const findUser = await this.userService.findOneEntity(userId);

    createEntityDto.user = findUser;
    return await this.walletRepository.createEntity(createEntityDto);
  }

  async findAllEntities(): Promise<WalletEntity[]> {
    return await this.walletRepository.findAllEntities();
  }

  async findOneEntity(id: string): Promise<WalletEntity> {
    return await this.walletRepository.findOneEntity(id);
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdateWalletDto,
  ): Promise<UpdateResult> {
    return await this.walletRepository.updateEntity(id, updateEntityDto);
  }

  async walletPagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<WalletEntity>> {
    return this.walletRepository.walletPagination(query);
  }
}
