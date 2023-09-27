import { Inject } from '@nestjs/common';
import { Paginated, paginate, FilterOperator } from 'nestjs-paginate';
import { RepositoriesAbstract } from 'src/common/abstract/repositories.abstract';
import { PostgresConstant } from 'src/common/constants/postgres.constant';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { ProductEntity } from 'src/entities/PRODUCT/product.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

export class ProductRepository
  extends Repository<ProductEntity>
  implements
  RepositoriesAbstract<ProductEntity, CreateProductDto, UpdateProductDto>
{
  constructor(
    @Inject(PostgresConstant) private postgresDataSource: DataSource,
  ) {
    super(ProductEntity, postgresDataSource.createEntityManager());
  }
  async createEntity(
    createEntityDto: CreateProductDto,
  ): Promise<ProductEntity> {
    return await this.save(this.create(createEntityDto));
  }
  async updateEntity(
    id: string,
    updateEntityDto: UpdateProductDto,
  ): Promise<UpdateResult> {
    return await this.update(id, updateEntityDto);
  }
  async findOneEntity(id: string): Promise<ProductEntity> {
    return await this.createQueryBuilder('product')
      .where('product.id=:id_product', { id_product: id })
      .getOne();
  }
  async findAllEntities(): Promise<ProductEntity[]> {
    // return await this.createQueryBuilder('product')
    // .leftJoinAndSelect('product.pricings', 'pricing')
    // .getMany();

    return await this.query(`
      SELECT
      p.*,
      (SELECT "id" FROM file f WHERE f.relation_id = p.id LIMIT 1) AS image,
      (SELECT "price" FROM wallet.pricing p2 WHERE p2."productId" = p.id LIMIT 1) AS price
      FROM
          product.product p
      WHERE
      (SELECT "id" FROM file f WHERE f.relation_id = p.id LIMIT 1) IS NOT NULL
      AND
      (SELECT "price" FROM wallet.pricing p2 WHERE p2."productId" = p.id LIMIT 1) IS NOT NULL;
    `)
  }

  async productPagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<ProductEntity>> {
    const selectQueryBuilder = this.createQueryBuilder('p')
    .addSelect('(SELECT "id" FROM file f WHERE f.relation_id = p.id LIMIT 1)', 'image')
    .addSelect('(SELECT "price" FROM wallet.pricing p2 WHERE p2."productId" = p.id LIMIT 1)', 'price');
    
    return paginate(query, selectQueryBuilder, {
      sortableColumns: ['create_at'],
      nullSort: 'last',
      searchableColumns: ['title', 'description'],
      defaultSortBy: [['create_at', 'DESC']],
      filterableColumns: {
        name: [FilterOperator.ILIKE],
      },
      select: ['image', '(SELECT "id" FROM file f WHERE f.relation_id = p.id LIMIT 1)'],

    });
  }
}
