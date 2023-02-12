import { Injectable } from '@nestjs/common';
import { Paginated } from 'nestjs-paginate';
import { UserService } from 'src/api/auth/user/service/user.service';
import { RepositoriesAbstract } from 'src/common/abstract/repositories.abstract';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { AccountEntity } from 'src/entities/WALLET/account.entity';
import { UpdateResult } from 'typeorm';
import { CreateAccountDto } from '../dto/create-account.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { AccountRepository } from '../repositories/account.repository';

@Injectable()
export class AccountService {
  constructor(
    private userService: UserService,
    private accountRepository: AccountRepository,
  ) {}
  async createEntity(
    createEntityDto: CreateAccountDto,
    userId: string,
  ): Promise<AccountEntity> {
    try {
      createEntityDto.user = await this.userService.findOneEntity(userId);
      return await this.accountRepository.createEntity(createEntityDto);
    } catch (e) {}
  }
  async updateEntity(
    id: string,
    updateEntityDto: UpdateAccountDto,
  ): Promise<UpdateResult> {
    try {
      return await this.accountRepository.updateEntity(id, updateEntityDto);
    } catch (e) {}
  }
  async findOneEntity(id: string): Promise<AccountEntity> {
    try {
      return await this.accountRepository.findOneEntity(id);
    } catch (e) {}
  }
  async findAllEntities(): Promise<AccountEntity[]> {
    try {
      return await this.accountRepository.findAllEntities();
    } catch (e) {}
  }

  async accountPagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<AccountEntity>> {
    return this.accountRepository.accountPagination(query);
  }
}
