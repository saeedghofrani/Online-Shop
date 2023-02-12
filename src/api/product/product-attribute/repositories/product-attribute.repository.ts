import { Paginated, paginate, FilterOperator } from 'nestjs-paginate';
import { RepositoriesAbstract } from 'src/common/abstract/repositories.abstract';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { ProductAttributeEntity } from 'src/entities/PRODUCT/product-attribute.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateProductAttribute } from '../dto/create-product-attribute.dto';
import { UpdateProductAttribute } from '../dto/update-product-attribute.dto';

export class ProductAttributeRepository
  extends Repository<ProductAttributeEntity>
  implements
    RepositoriesAbstract<
      ProductAttributeEntity,
      CreateProductAttribute,
      UpdateProductAttribute
    >
{
  async createEntity(
    createEntityDto: CreateProductAttribute,
  ): Promise<ProductAttributeEntity> {
    return await this.save(this.create(createEntityDto));
  }
  async updateEntity(
    id: string,
    updateEntityDto: UpdateProductAttribute,
  ): Promise<UpdateResult> {
    return await this.update(id, updateEntityDto);
  }
  async findOneEntity(id: string): Promise<ProductAttributeEntity> {
    return await this.createQueryBuilder('product_attribute')
      .where('product_attribute.id=:product_attribute_id', {
        product_attribute_id: id,
      })
      .getOne();
  }
  async findAllEntities(): Promise<ProductAttributeEntity[]> {
    return await this.createQueryBuilder('product_attribute').getMany();
  }

  async productAttributePagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<ProductAttributeEntity>> {
    return paginate(query, this, {
      sortableColumns: ['create_at'],
      nullSort: 'last',
      searchableColumns: ['attribute.name', 'product.name'],
      defaultSortBy: [['create_at', 'DESC']],
      filterableColumns: {
        'attribute.name': [FilterOperator.ILIKE],
        'product.name': [FilterOperator.ILIKE],
      },
    });
  }
}
