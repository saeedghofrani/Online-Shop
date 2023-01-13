import { Injectable, Inject } from '@nestjs/common';
import { Paginated, paginate, FilterOperator } from 'nestjs-paginate';
import { RepositoriesAbstract } from 'src/common/abstract/repositories.abstract';
import { PostgresConstant } from 'src/common/constants/postgres.constant';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import postgresConfiguration from 'src/config/database/postgres/postgres.configuration';
import { AttributeEntity } from 'src/entities/PRODUCT/attribute.entity';
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
    return await this.createQueryBuilder('attribute').getMany();
  }

  async attributePagination(query:PaginationQueryDto):Promise<Paginated<AttributeEntity>>{
    return paginate(query, this, {
      sortableColumns: ['create_at'],
      nullSort: 'last',
      searchableColumns: ['name'],
      defaultSortBy: [['create_at', 'DESC']],
      filterableColumns: {
        name: [FilterOperator.ILIKE],
      },
    })
  }
}
