import { Inject } from '@nestjs/common';
import {
  Paginated,
  paginate,
  FilterOperator,
  FilterComparator,
  PaginationType,
} from 'nestjs-paginate';
import { RepositoriesAbstract } from 'src/common/abstract/repositories.abstract';
import { PostgresConstant } from 'src/common/constants/postgres.constant';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { ProductEntity } from 'src/entities/product/product.entity';
import {
  DataSource,
  Repository,
  SelectQueryBuilder,
  UpdateResult,
  getRepository,
} from 'typeorm';
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
  async removeProduct(id: string): Promise<ProductEntity> {
    const product = await this.findOne({ where: { id } });
    return await product.softRemove();
  }
  async findAllEntities(): Promise<ProductEntity[]> {
    return await this.query(`
    SELECT
    p.title ,
    p.id ,
    p.description ,
    p.price as defaultPrice,
    p.original_title ,
    (SELECT "id" FROM file f WHERE f.relation_id = p.id and f.type= '0'::file_type_enum  LIMIT 1) AS image,
    CAST((SELECT MIN(pav.price) FROM product.product_attribute_value pav where pav."productId" = p.id and pav.price > 0 LIMIT 1) AS FLOAT) AS price
    FROM
        product.product p where p.delete_at is null order by p.id asc
    `);
  }

  async productList() {
    return await this.createQueryBuilder('p')
      .innerJoinAndSelect('p.product_attributes_value', 'pav')
      .innerJoinAndSelect('pav.attribute_value', 'av')
      .innerJoinAndSelect('av.attribute', 'a', 'a.type = :attributeType', {
        attributeType: 0,
      })
      .orderBy('p.id', 'ASC')
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
      SELECT "id" as image FROM file f WHERE f.relation_id = ${element.id} and f.type= '0'::file_type_enum  LIMIT 1 
      `);
      const price = await this.query(`
      SELECT MIN(pav.price) as price FROM product.product_attribute_value pav where pav."productId" = ${element.id} and pav.price > 0 and pav.delete_at is null LIMIT 1
      `);
      element.image = image[0] ? image[0]['image'] : '';
      element.price = Number(price[0] ? price[0]['price'] : '');
    }
    return pagination;
  }

  async test(query: PaginationQueryDto): Promise<Paginated<ProductEntity>> {
    const { page, limit } = query;
    const skip = (page - 1) * limit;
    // const [products, totalItems] = await this.createQueryBuilder('product')
    // .leftJoinAndSelect('product.product_attributes_value', 'pav')
    // .where('pav.price > 0')
    // .skip(skip)
    // .take(limit) // Adjust this condition as needed
    // // .getManyAndCount();
    // .getMany()
    const [product, totalItems] = await this.createQueryBuilder('')
      .skip(skip)
      .take(limit)
      .addFrom(
        `SELECT "id" as image FROM file f WHERE f.relation_id = p.id LIMIT 1 `,
        `image`,
      )
      .addSelect(
        `SELECT pav.price as price FROM product.product_attribute_value pav where pav."productId" = p.id and pav.price > 0 LIMIT 1`,
      )
      .getManyAndCount();
    const totalPages = Math.ceil(totalItems / limit);
    return new Paginated();
  }
}
