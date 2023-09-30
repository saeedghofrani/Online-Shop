import { Injectable } from '@nestjs/common';
import { Paginated } from 'nestjs-paginate';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { UpdateResult } from 'typeorm';
import { OrderEntity } from '../../../../entities/WALLET/order.entity';
import { UserService } from '../../../auth/user/service/user.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { OrderRepository } from '../repositories/order.repository';

@Injectable()
export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private userService: UserService,
  ) {}
  async createEntity(
    createEntityDto: CreateOrderDto,
    userId: string,
    pricingId: string,
  ): Promise<OrderEntity> {
    try {
      const findUser = await this.userService.findOneEntity(userId);

      createEntityDto.user = findUser;

      return await this.orderRepository.createEntity(createEntityDto);
    } catch (e) {}
  }

  async findAllEntities(): Promise<OrderEntity[]> {
    try {
      return await this.orderRepository.findAllEntities();
    } catch (e) {}
  }

  async findOneEntity(id: string): Promise<OrderEntity> {
    try {
      return await this.orderRepository.findOneEntity(id);
    } catch (e) {}
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdateOrderDto,
    userId: string,
    pricingId: string,
  ): Promise<UpdateResult> {
    try {
      if (userId)
        updateEntityDto.user = await this.userService.findOneEntity(userId);

      return await this.orderRepository.updateEntity(id, updateEntityDto);
    } catch (e) {}
  }

  async orderPagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<OrderEntity>> {
    return this.orderRepository.orderPagination(query);
  }
}
