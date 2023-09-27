import { DataSource, Repository, UpdateResult } from 'typeorm';
import { PricingEntity } from '../../../../entities/WALLET/pricing.entity';
import { RepositoriesAbstract } from '../../../../common/abstract/repositories.abstract';
import { CreatePricingDto } from '../dto/create-pricing.dto';
import { UpdatePricingDto } from '../dto/update-pricing.dto';
import { Inject, Injectable } from '@nestjs/common';
import { PostgresConstant } from '../../../../common/constants/postgres.constant';
import { Paginated, paginate, FilterOperator } from 'nestjs-paginate';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';

@Injectable()
export class PricingRepository
  extends Repository<PricingEntity>
  implements
    RepositoriesAbstract<PricingEntity, CreatePricingDto, UpdatePricingDto>
{
  constructor(
    @Inject(PostgresConstant) private postgresDataSource: DataSource,
  ) {
    super(PricingEntity, postgresDataSource.createEntityManager());
  }
  async createEntity(
    createEntityDto: CreatePricingDto,
  ): Promise<PricingEntity> {
    return await this.save(this.create(createEntityDto));
  }

  async findAllEntities(): Promise<PricingEntity[]> {
    return await this.createQueryBuilder('pricing').getMany();
  }

  async findOneEntity(id: string): Promise<PricingEntity> {
    return await this.createQueryBuilder('pricing')
    .innerJoinAndSelect('pricing.product', 'product')
      .where('pricing.id=:id_pricing', { id_pricing: id })
      .getOne();
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdatePricingDto,
  ): Promise<UpdateResult> {
    return await this.update(id, updateEntityDto);
  }

  async pricingPagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<PricingEntity>> {
    return paginate(query, this, {
      sortableColumns: ['create_at'],
      nullSort: 'last',
      searchableColumns: ['price'],
      defaultSortBy: [['create_at', 'DESC']],
      filterableColumns: {
        price: [FilterOperator.EQ],
      },
    });
  }
}
