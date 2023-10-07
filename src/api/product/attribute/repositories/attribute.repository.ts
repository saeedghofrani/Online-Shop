import { Injectable, Inject } from '@nestjs/common';
import { Paginated, paginate, FilterOperator } from 'nestjs-paginate';
import { RepositoriesAbstract } from 'common/abstract/repositories.abstract';
import { PostgresConstant } from 'common/constants/postgres.constant';
import { PaginationQueryDto } from 'common/pagination/pagination-query.dto';
import postgresConfiguration from 'config/database/postgres/postgres.configuration';
import { AttributeEntity } from 'entities/product/attribute.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { CreateAttributeDto } from '../dto/create-attribute.dto';
import { UpdateAttributeDto } from '../dto/update-attribute.dto';

@Injectable()
export class AttributeRepository
  extends Repository<AttributeEntity>
  implements
    RepositoriesAbstract<
      AttributeEntity,
      CreateAttributeDto,
      UpdateAttributeDto
    >
{
  constructor(
    @Inject(PostgresConstant) private postgresDataSource: DataSource,
  ) {
    super(AttributeEntity, postgresDataSource.createEntityManager());
  }

  async createEntity(
    createEntityDto: CreateAttributeDto,
  ): Promise<AttributeEntity> {
    return await this.save(this.create(createEntityDto));
  }
  async updateEntity(
    id: string,
    updateEntityDto: UpdateAttributeDto,
  ): Promise<UpdateResult> {
    return await this.update(id, updateEntityDto);
  }
  async findOneEntity(id: string): Promise<AttributeEntity> {
    return await this.createQueryBuilder('attribute')
      .where('attribute.id=:attribute_id', { attribute_id: id })
      .getOne();
  }
  async findAllEntities(): Promise<AttributeEntity[]> {
    return await this.createQueryBuilder('attribute')
      .orderBy('attribute.id', 'ASC')
      .getMany();
  }

  async categoryAttribute(product_id: number) {
    return await this.query(`
      select a."name",a."type" , ca.priceable, a.id  from product.product p 
      inner join product.category_attribute ca on ca."categoryId" = p."categoryId" and ca.delete_at is null
      inner join product."attribute" a on a.id = ca."attributeId" and a.delete_at is null
      where p.id = ${product_id} and p.delete_at is NULL order by p.id desc
    `);
  }

  async removeAttribute(id: string) {
    const attribute = await this.findOne({ where: { id } });
    return await attribute.softRemove();
  }

  async attributePagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<AttributeEntity>> {
    return paginate(query, this, {
      sortableColumns: ['id'],
      nullSort: 'last',
      searchableColumns: ['name'],
      defaultSortBy: [['id', 'DESC']],
      filterableColumns: {
        name: [FilterOperator.ILIKE],
      },
    });
  }
}
