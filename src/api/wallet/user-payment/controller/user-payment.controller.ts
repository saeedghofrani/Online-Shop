import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from 'common/pagination/pagination-query.dto';
import { UserPaymentEntity } from 'entities/wallet/user-payment.entity';
import { UpdateResult } from 'typeorm';
import { CreateUserPaymentDto } from '../dto/create-user-payment.dto';
import { UpdateUserPaymentDto } from '../dto/update-user-payment.dto';
import { UserPaymentService } from '../services/user-payment.service';

@ApiBearerAuth('access-token')
@ApiTags('UserPayment')
@Controller('user-payment')
export class UserPaymentController {
  constructor(private userPaymentService: UserPaymentService) {}

  @Post()
  createEntity(
    @Body() createEntityDto: CreateUserPaymentDto,
  ): Promise<UserPaymentEntity> {
    return this.userPaymentService.createEntity(createEntityDto);
  }

  @Patch()
  updateEntity(
    @Query('user_payment_id') id: string,
    @Body() updateEntityDto: UpdateUserPaymentDto,
  ): Promise<UpdateResult> {
    return this.userPaymentService.updateEntity(id, updateEntityDto);
  }

  @Get()
  findOneEntity(
    @Query('user_payment_id') id: string,
  ): Promise<UserPaymentEntity> {
    return this.userPaymentService.findOneEntity(id);
  }

  @Get('all')
  async findAllEntities(): Promise<UserPaymentEntity[]> {
    return this.userPaymentService.findAllEntities();
  }

  @Post('page')
  @ApiOperation({ summary: 'User Payment Pagination' })
  accountPagination(@Body() query: PaginationQueryDto) {
    return this.userPaymentService.userPaymentPagination(query);
  }
}
