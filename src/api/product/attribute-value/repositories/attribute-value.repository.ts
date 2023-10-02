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
      .orderBy('attribute_value.id', 'ASC')
      .getMany();
  }

  async findAllEntities(): Promise<AttributeValueEntity[]> {
    return await this.createQueryBuilder('attribute_value')
      .orderBy('attribute.id', 'ASC')
      .getMany();
  }

  async removeAttributeValue(id: string): Promise<AttributeValueEntity> {
    const attributeValue = await this.findOne({ where: { id } });
    return await attributeValue.softRemove();
  }

  async productAttributeValue(id: number): Promise<AttributeValueEntity> {
    return await this.query(`
    select a."name" , av.value , ca.priceable , pav.price, pav.id  from product.product_attribute_value pav 
    inner join product.attribute_value av on av.id = pav."attributeValueId"  and av.delete_at is NULL
      inner join product."attribute" a on a.id = av."attributeId" and a.delete_at is NULL
      inner join product.category_attribute ca on ca."attributeId" = a.id and ca.delete_at is NULL
    inner join product.product p on p."categoryId" = ca."categoryId" and p.id = ${id} and p.delete_at is NULL 
    and pav.delete_at is NULL
    order by p.id asc
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
