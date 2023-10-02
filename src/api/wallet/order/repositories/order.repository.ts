import { Inject, Injectable } from '@nestjs/common';
import { Paginated, paginate, FilterOperator } from 'nestjs-paginate';
import { PaginationQueryDto } from 'common/pagination/pagination-query.dto';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { RepositoriesAbstract } from '../../../../common/abstract/repositories.abstract';
import { PostgresConstant } from '../../../../common/constants/postgres.constant';
import { OrderEntity } from '../../../../entities/wallet/order.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';

@Injectable()
export class OrderRepository
  extends Repository<OrderEntity>
  implements RepositoriesAbstract<OrderEntity, CreateOrderDto, UpdateOrderDto>
{
  constructor(
    @Inject(PostgresConstant) private postgresDataSource: DataSource,
  ) {
    super(OrderEntity, postgresDataSource.createEntityManager());
  }

  async createEntity(createEntityDto: CreateOrderDto): Promise<OrderEntity> {
    return await this.save(this.create(createEntityDto));
  }

  async findAllEntities(): Promise<OrderEntity[]> {
    return await this.createQueryBuilder('order').getMany();
  }

  async findOneEntity(id: string): Promise<OrderEntity> {
    return await this.createQueryBuilder('order')
      .where('order.id=:order_id', { order_id: id })
      .getOne();
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdateOrderDto,
  ): Promise<UpdateResult> {
    return await this.update(id, updateEntityDto);
  }

  async orderPagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<OrderEntity>> {
    return paginate(query, this, {
      sortableColumns: ['create_at'],
      nullSort: 'last',
      defaultSortBy: [['create_at', 'DESC']],
    });
  }
}
