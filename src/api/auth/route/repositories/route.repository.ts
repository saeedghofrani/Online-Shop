import { Inject, Injectable } from '@nestjs/common';
import { Paginated, paginate, FilterOperator } from 'nestjs-paginate';
import { RepositoriesAbstract } from 'src/common/abstract/repositories.abstract';
import { PostgresConstant } from 'src/common/constants/postgres.constant';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { ProfileEntity } from 'src/entities/AUTH/profile.entity';
import { RouteEntity } from 'src/entities/AUTH/route.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { CreateRouteDto } from '../dto/create-route.dto';
import { UpdateRouteDto } from '../dto/update-route.dto';

@Injectable()
export class RouteRepository
  extends Repository<RouteEntity>
  implements RepositoriesAbstract<RouteEntity, CreateRouteDto, UpdateRouteDto>
{
  constructor(
    @Inject(PostgresConstant) private postgresDatasource: DataSource,
  ) {
    super(RouteEntity, postgresDatasource.createEntityManager());
  }

  async createEntity(createEntityDto: CreateRouteDto): Promise<RouteEntity> {
    return await this.save(this.create(createEntityDto));
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdateRouteDto,
  ): Promise<UpdateResult> {
    return await this.update(id, updateEntityDto);
  }

  async findOneEntity(routeId: string): Promise<RouteEntity> {
    return await this.createQueryBuilder('route')
      .where('route.id = :routeId', {
        routeId,
      })
      .getOne();
  }

  async findAllEntities(): Promise<RouteEntity[]> {
    return await this.createQueryBuilder('route').getMany();
  }

  async findByEntity(searchTerm: string): Promise<RouteEntity> {
    return await this.createQueryBuilder('route')
      .where(
        `route.summary = :searchTerm OR route.jwt = :searchTerm OR route.status = :searchTerm OR route.address = :searchTerm`,
        {
          searchTerm,
        },
      )
      .getOne();
  }

  async routePagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<RouteEntity>> {
    return paginate(query, this, {
      sortableColumns: ['create_at'],
      nullSort: 'last',
      searchableColumns: ['address'],
      defaultSortBy: [['create_at', 'DESC']],
      filterableColumns: {
        //##TODO
        jwt: [FilterOperator.NULL],
      },
    });
  }
}
