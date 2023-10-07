import { Inject, Injectable } from '@nestjs/common';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { RepositoriesAbstract } from 'common/abstract/repositories.abstract';
import { PostgresConstant } from 'common/constants/postgres.constant';
import { PaginationQueryDto } from 'common/pagination/pagination-query.dto';
import { BrandEntity } from 'entities/product/brand.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';

@Injectable()
export class BrandRepository
  extends Repository<BrandEntity>
  implements RepositoriesAbstract<BrandEntity, CreateBrandDto, UpdateBrandDto>
{
  constructor(
    @Inject(PostgresConstant) private postgresDataSource: DataSource,
  ) {
    super(BrandEntity, postgresDataSource.createEntityManager());
  }
  async createEntity(createEntityDto: CreateBrandDto): Promise<BrandEntity> {
    return await this.save(this.create(createEntityDto));
  }
  async updateEntity(
    id: string,
    updateEntityDto: UpdateBrandDto,
  ): Promise<UpdateResult> {
    return await this.update(id, updateEntityDto);
  }
  async findOneEntity(id: string): Promise<BrandEntity> {
    return await this.createQueryBuilder('brand')
      .where('brand.id=:brand_id', { brand_id: id })
      .andWhere('brand.status')
      .getOne();
  }
  async findAllEntities(): Promise<BrandEntity[]> {
    return await this.createQueryBuilder('brand')
      .where('brand.status')
      .orderBy('brand.id', 'ASC')
      .getMany();
  }

  async updateStatus(id: string): Promise<BrandEntity> {
    const brand = await this.findOne({ where: { id } });
    brand.status = brand.status ? false : true;
    brand.name = 'deleted_' + brand.id + '_' + brand.name;
    brand.original_name = 'deleted_' + brand.id + '_' + brand.original_name;
    return await this.save(this.create(brand));
  }

  async brandPagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<BrandEntity>> {
    return paginate(query, this, {
      sortableColumns: ['id'],
      nullSort: 'last',
      searchableColumns: ['name', 'description'],
      defaultSortBy: [['id', 'DESC']],
      filterableColumns: {
        name: [FilterOperator.ILIKE],
      },
    });
  }
}
