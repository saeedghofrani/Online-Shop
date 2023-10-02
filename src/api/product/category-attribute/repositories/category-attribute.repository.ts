import { Inject, Injectable } from '@nestjs/common';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { RepositoriesAbstract } from 'src/common/abstract/repositories.abstract';
import { PostgresConstant } from 'src/common/constants/postgres.constant';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { CategoryAttributeEntity } from 'src/entities/PRODUCT/category-attribute.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { CreateCategoryAttributeDto } from '../dto/create-category-attribute.dto';
import { UpdateCategoryAttributeDto } from '../dto/update-category-attribute.dto';

@Injectable()
export class CategoryAttributeRepository
  extends Repository<CategoryAttributeEntity>
  implements
    RepositoriesAbstract<
      CategoryAttributeEntity,
      CreateCategoryAttributeDto,
      UpdateCategoryAttributeDto
    >
{
  constructor(
    @Inject(PostgresConstant) private postgresDataSource: DataSource,
  ) {
    super(CategoryAttributeEntity, postgresDataSource.createEntityManager());
  }
  async createEntity(
    createEntityDto: CreateCategoryAttributeDto,
  ): Promise<CategoryAttributeEntity> {
    return await this.save(this.create(createEntityDto));
  }
  async updateEntity(
    id: string,
    updateEntityDto: UpdateCategoryAttributeDto,
  ): Promise<UpdateResult> {
    return await this.update(id, updateEntityDto);
  }

  async findOneEntity(id: string): Promise<CategoryAttributeEntity> {
    return await this.createQueryBuilder('category_attribute')
      .where('category_attribute.id=:category_attribute_id', {
        category_attribute_id: id,
      })
      .getOne();
  }

  async findAllEntities(): Promise<CategoryAttributeEntity[]> {
    return await this.createQueryBuilder('category_attribute').getMany();
  }

  async findPriceableAttribute(category_id: string, attribute_id: string) {
    return await this.createQueryBuilder('category_attribute')
      .innerJoinAndSelect('category_attribute.category', 'category')
      .innerJoinAndSelect('category_attribute.attribute', 'attribute')
      .where(
        'attribute.id = :attribute_id and category.id = :category_id and category_attribute.priceable',
        {
          attribute_id,
          category_id,
        },
      )
      .getOne();
  }

  async removeCategoryAttribute(id: string) {
    const categoryAttribute = await this.findOne({where: {id}});
    return await categoryAttribute.softRemove();
  }

  async categoryAttributePagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<CategoryAttributeEntity>> {
    return paginate(query, this, {
      sortableColumns: ['create_at'],
      nullSort: 'last',
      searchableColumns: ['filterable', 'priceable'],
      defaultSortBy: [['create_at', 'DESC']],
      filterableColumns: {
        name: [FilterOperator.ILIKE],
      },
    });
  }
}
