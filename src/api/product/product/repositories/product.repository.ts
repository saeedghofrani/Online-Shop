import { Inject } from '@nestjs/common';
import { Paginated, paginate, FilterOperator, FilterComparator, PaginationType } from 'nestjs-paginate';
import { RepositoriesAbstract } from 'src/common/abstract/repositories.abstract';
import { PostgresConstant } from 'src/common/constants/postgres.constant';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { ProductEntity } from 'src/entities/PRODUCT/product.entity';
import { DataSource, Repository, SelectQueryBuilder, UpdateResult, getRepository } from 'typeorm';
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
    return await this.query(`
    SELECT
    p.title ,
    p.description ,
    p.original_title ,
    (SELECT "id" FROM file f WHERE f.relation_id = p.id LIMIT 1) AS image,
    CAST((SELECT "price" FROM product.product_attribute_value pav where pav."productId" = p.id and pav.price > 0 LIMIT 1) AS FLOAT) AS price
    FROM
        product.product p
    WHERE
    (SELECT "id" FROM file f WHERE f.relation_id = p.id LIMIT 1) IS NOT NULL
    AND
    (SELECT pav.price FROM product.product_attribute_value pav where pav."productId" = p.id and pav.price > 0 LIMIT 1) IS NOT NULL;
    `);
  }

  async productList() {
    return await this.createQueryBuilder('p')
      .innerJoinAndSelect('p.product_attributes_value', 'pav')
      .innerJoinAndSelect('pav.attribute_value', 'av')
      .innerJoinAndSelect('av.attribute', 'a', 'a.type = :attributeType', {
        attributeType: 0,
      })
      .getMany();
  }

  async productPagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<ProductEntity>> {
    const pagination = await paginate(query, this, {
      sortableColumns: ['create_at'],
      nullSort: 'last',
      searchableColumns: ['title', 'description'],
      defaultSortBy: [['title', 'DESC']],
      filterableColumns: {
        name: [FilterOperator.ILIKE],
      },
      paginationType: PaginationType.TAKE_AND_SKIP,
    });
    for (let i = 0; i < pagination.data.length; i++) {
      const element: any = pagination.data[i];
      const image = await this.query(`
      SELECT "id" as image FROM file f WHERE f.relation_id = ${element.id} LIMIT 1 
      `)
      const price = await this.query(`
      SELECT pav.price as price FROM product.product_attribute_value pav where pav."productId" = ${element.id} and pav.price > 0 LIMIT 1
      `)
      element.image = image[0] ? image[0]['image'] : '';
      element.price = Number(price[0] ? price[0]['price'] : '');
    }
    return pagination;
  }

  async test(
    query: PaginationQueryDto,
  ): Promise<Paginated<ProductEntity>> {
    const { page, limit } = query;
    const skip = (page - 1) * limit;
    const [product, totalItems] = await this.createQueryBuilder('')
      .skip(skip)
      .take(limit)
      // .addFrom(`SELECT "id" as image FROM file f WHERE f.relation_id = ${element.id} LIMIT 1 `, `image`)
      // .addSelect(`SELECT pav.price as price FROM product.product_attribute_value pav where pav."productId" = ${element.id} and pav.price > 0 LIMIT 1`)
      .getManyAndCount();
    const totalPages = Math.ceil(totalItems / limit);
    return new Paginated();
  }
}
