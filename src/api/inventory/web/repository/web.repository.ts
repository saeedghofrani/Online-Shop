import { Inject } from '@nestjs/common';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginationType,
} from 'nestjs-paginate';
import { RepositoriesAbstract } from 'src/common/abstract/repositories.abstract';
import { PostgresConstant } from 'src/common/constants/postgres.constant';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { WebEntity } from 'src/entities/inventory/web.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { CreateWebDto } from '../dto/create-web.dto';
import { UpdateWebDto } from '../dto/update-web.dto';

export class WebRepository
  extends Repository<WebEntity>
  implements RepositoriesAbstract<WebEntity, CreateWebDto, UpdateWebDto>
{
  constructor(
    @Inject(PostgresConstant) private postgresDataSource: DataSource,
  ) {
    super(WebEntity, postgresDataSource.createEntityManager());
  }

  async createEntity(createEntityDto: CreateWebDto): Promise<WebEntity> {
    return await this.save(this.create(createEntityDto));
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdateWebDto,
  ): Promise<UpdateResult> {
    return await this.update(id, updateEntityDto);
  }

  async findAllEntities(): Promise<WebEntity[]> {
    return await this.query(`
    select
    * ,
    (select id from public.file f where f.relation_id = w.id and f.type= '3'::file_type_enum order by create_at limit 1) as image
    from inventory.web w 
    `);
  }

  async findLast(): Promise<WebEntity[]> {
    return await this.query(`
    select
    * ,
    (select id from public.file f where f.relation_id = w.id and f.type= '3'::file_type_enum order by create_at limit 1) as image 
    from inventory.web w order by id desc limit 1
    `);
  }

  async findByEntity(searchTerm: string): Promise<WebEntity> {
    return await this.createQueryBuilder('web')
      .where(`web.name = :searchTerm OR web.original_name = :searchTerm`, {
        searchTerm,
      })
      .getOne();
  }

  async findOneEntity(webId: string): Promise<WebEntity> {
    return await this.createQueryBuilder('web')
      .where('web.id = :webId', {
        webId,
      })
      .getOne();
  }

  async webPagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<WebEntity>> {
    return paginate(query, this, {
      sortableColumns: ['create_at'],
      nullSort: 'last',
      defaultSortBy: [['create_at', 'DESC']],
      filterableColumns: {
        name: [FilterOperator.ILIKE],
      },
      paginationType: PaginationType.TAKE_AND_SKIP,
    });
  }
}
