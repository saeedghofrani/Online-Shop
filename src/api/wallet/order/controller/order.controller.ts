import { RepositoriesAbstract } from '../../../../common/abstract/repositories.abstract';
import { OrderEntity } from '../../../../entities/wallet/order.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { OrderService } from '../service/order.service';
import { PaginationQueryDto } from 'common/pagination/pagination-query.dto';

@ApiBearerAuth('access-token')
@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  async createEntity(
    @Body() createEntityDto: CreateOrderDto,
    @Query('user_Id') userId: string,
    @Query('product_id') pricingId: string,
  ): Promise<OrderEntity> {
    return this.orderService.createEntity(createEntityDto, userId, pricingId);
  }

  @Get('all')
  async findAllEntities(): Promise<OrderEntity[]> {
    return this.orderService.findAllEntities();
  }

  @Get()
  async findOneEntity(@Query('order_id') id: string): Promise<OrderEntity> {
    return this.orderService.findOneEntity(id);
  }

  @Patch()
  async updateEntity(
    @Query('order_Id') id: string,
    @Body() updateEntityDto: UpdateOrderDto,
    @Query('user_Id') userId: string,
    @Query('product_id') pricingId: string,
  ): Promise<UpdateResult> {
    return this.orderService.updateEntity(
      id,
      updateEntityDto,
      userId,
      pricingId,
    );
  }

  @Post('page')
  @ApiOperation({ summary: 'Order Pagination' })
  orderPagination(@Body() query: PaginationQueryDto) {
    return this.orderService.orderPagination(query);
  }
}
