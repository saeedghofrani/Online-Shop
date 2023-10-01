import { Inject, Injectable } from '@nestjs/common';
import { FilterOperator, Paginated, paginate } from 'nestjs-paginate';
import { RepositoriesAbstract } from 'src/common/abstract/repositories.abstract';
import { PostgresConstant } from 'src/common/constants/postgres.constant';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { AttributeValueEntity } from 'src/entities/PRODUCT/attribute-value.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { CreateAttributeValueDto } from '../dto/create-attribute-value.dto';
import { UpdateAttributeValueDto } from '../dto/update-attribute-value.dto';

@Injectable()
export class AttributeValueRepository
  extends Repository<AttributeValueEntity>
  implements
    RepositoriesAbstract<
      AttributeValueEntity,
      CreateAttributeValueDto,
      UpdateAttributeValueDto
    >
{
  constructor(
    @Inject(PostgresConstant) private postgresDataSource: DataSource,
  ) {
    super(AttributeValueEntity, postgresDataSource.createEntityManager());
  }
  async createEntity(
    createEntityDto: CreateAttributeValueDto,
  ): Promise<AttributeValueEntity> {
    return await this.save(this.create(createEntityDto));
  }
  async updateEntity(
    id: string,
    updateEntityDto: UpdateAttributeValueDto,
  ): Promise<UpdateResult> {
    return await this.update(id, updateEntityDto);
  }
  async findOneEntity(id: string): Promise<AttributeValueEntity> {
    return await this.createQueryBuilder('attribute_value')
      .where('attribute_value.id=:attribute_value_id', {
        attribute_value_id: id,
      })
      .getOne();
  }

  async findByAttribute(id: string): Promise<AttributeValueEntity[]> {
    return await this.createQueryBuilder('attribute_value')
      .where('attribute_value.attribute=:id', {
        id,
      })
      .getMany();
  }

  async findAllEntities(): Promise<AttributeValueEntity[]> {
    return await this.createQueryBuilder('attribute_value').getMany();
  }

  async removeAttributeValue(id: string): Promise<AttributeValueEntity> {
    const attributeValue = await this.findOne({ where: { id } });
    return await attributeValue.softRemove();
  }

  async productAttributeValue(id: number): Promise<AttributeValueEntity> {
    return await this.query(`
      select a."name" , av.value , ca.priceable , pav.price  from product.product p 
      inner join product.category_attribute ca on ca."categoryId" = p."categoryId" 
      inner join product."attribute" a on a.id = ca."attributeId"
      inner join product.attribute_value av on av."attributeId" = ca."attributeId" 
      inner join product.product_attribute_value pav on pav."productId" = p.id
      where p.id = ${id}
    `);
  }

  async attributeValuePagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<AttributeValueEntity>> {
    return paginate(query, this, {
      sortableColumns: ['create_at'],
      nullSort: 'last',
      searchableColumns: ['value'],
      defaultSortBy: [['create_at', 'DESC']],
      filterableColumns: {
        name: [FilterOperator.ILIKE],
      },
    });
  }
}
