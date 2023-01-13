import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RepositoriesAbstract } from 'src/common/abstract/repositories.abstract';
import { GetUser } from 'src/common/decorator/user.decorator';
import { UserInterface } from 'src/common/interfaces/user.interface';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { AccountEntity } from 'src/entities/WALLET/account.entity';
import { UpdateResult } from 'typeorm';
import { CreateAccountDto } from '../dto/create-account.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { AccountService } from '../services/account.service';

@ApiBearerAuth('access-token')
@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post()
  createEntity(
    @Body() createEntityDto: CreateAccountDto,
    @GetUser() user: UserInterface,
  ): Promise<AccountEntity> {
    return this.accountService.createEntity(createEntityDto, user.userId);
  }
  @Patch()
  updateEntity(
    @Query('account_id') id: string,
    @Body() updateEntityDto: UpdateAccountDto,
  ): Promise<UpdateResult> {
    return this.accountService.updateEntity(id, updateEntityDto);
  }
  @Get()
  findOneEntity(@Query('account_id') id: string): Promise<AccountEntity> {
    return this.accountService.findOneEntity(id);
  }
  @Get('all')
  findAllEntities(): Promise<AccountEntity[]> {
    return this.accountService.findAllEntities();
  }

  @Post("page")
  accountPagination(@Body() query:PaginationQueryDto)
  {
    return this.accountService.accountPagination(query)
  }
}
