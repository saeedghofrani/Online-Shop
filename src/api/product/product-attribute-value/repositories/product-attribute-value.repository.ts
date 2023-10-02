import { Inject, Injectable } from '@nestjs/common';
import { FilterOperator, Paginated, paginate } from 'nestjs-paginate';
import { RepositoriesAbstract } from 'src/common/abstract/repositories.abstract';
import { PostgresConstant } from 'src/common/constants/postgres.constant';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { ProductAttributeValueEntity } from 'src/entities/PRODUCT/product-attribute-value.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { CreateProductAttributeValueDto } from '../dto/create-product-attribute-value.dto';
import { UpdateProductAttributeValueDto } from '../dto/update-product-attribute-value.dto';

@Injectable()
export class ProductAttributeValueRepository
  extends Repository<ProductAttributeValueEntity>
  implements
    RepositoriesAbstract<
      ProductAttributeValueEntity,
      CreateProductAttributeValueDto,
      UpdateProductAttributeValueDto
    >
{
  constructor(
    @Inject(PostgresConstant) private postgresDataSource: DataSource,
  ) {
    super(
      ProductAttributeValueEntity,
      postgresDataSource.createEntityManager(),
    );
  }
  async createEntity(
    createEntityDto: CreateProductAttributeValueDto,
  ): Promise<ProductAttributeValueEntity> {
    return await this.save(this.create(createEntityDto));
  }
  async updateEntity(
    id: string,
    updateEntityDto: UpdateProductAttributeValueDto,
  ): Promise<UpdateResult> {
    return await this.update(id, updateEntityDto);
  }
  async findOneEntity(id: string): Promise<ProductAttributeValueEntity> {
    return await this.createQueryBuilder('product_attribute_value')
      .where('product_attribute_value.id=:product_attribute_value_id', {
        productattribute_value_id: id,
      })
      .getOne();
  }
  async findAllEntities(): Promise<ProductAttributeValueEntity[]> {
    return await this.createQueryBuilder('product_attribute_value')
      .orderBy('product_attribute_value.id', 'ASC')
      .getMany();
  }

  async removeEntity(id: string) {
    const productAttributeValue = await this.findOne({ where: { id } });
    return productAttributeValue.softRemove();
  }

  async findByProduct(id: string): Promise<ProductAttributeValueEntity[]> {
    return await this.createQueryBuilder('product_attribute_value')
      .innerJoinAndSelect(
        'product_attribute_value.attribute_value',
        'attribute_value',
      )
      .where('product_attribute_value.product = :id', {
        id,
      })
      .orderBy('product_attribute_value.id', 'ASC')
      .getMany();
  }

  async ProductAttributeValuePagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<ProductAttributeValueEntity>> {
    return paginate(query, this, {
      sortableColumns: ['create_at'],
      nullSort: 'last',
      searchableColumns: [],
      defaultSortBy: [['create_at', 'DESC']],
      filterableColumns: {
        name: [FilterOperator.ILIKE],
      },
    });
  }
}
