import { Inject, Injectable } from '@nestjs/common';
import { Paginated, paginate, FilterOperator } from 'nestjs-paginate';
import { RepositoriesAbstract } from 'src/common/abstract/repositories.abstract';
import { PostgresConstant } from 'src/common/constants/postgres.constant';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { CityEntity } from 'src/entities/LOCATION/city.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { CreateCityDto } from '../dto/create-city.dto';
import { UpdateCityDto } from '../dto/update-city.dto';

@Injectable()
export class CityRepository
  extends Repository<CityEntity>
  implements RepositoriesAbstract<CityEntity, CreateCityDto, UpdateCityDto>
{
  constructor(
    @Inject(PostgresConstant) private postgresDataSource: DataSource,
  ) {
    super(CityEntity, postgresDataSource.createEntityManager());
  }

  async createEntity(createEntityDto: CreateCityDto): Promise<CityEntity> {
    return await this.save(this.create(createEntityDto));
  }
  async updateEntity(
    id: string,
    updateEntityDto: UpdateCityDto,
  ): Promise<UpdateResult> {
    return await this.update(id, updateEntityDto);
  }
  async findOneEntity(id: string): Promise<CityEntity> {
    return await this.createQueryBuilder('city')
      .where('city.id=:city_id', { city_id: id })
      .getOne();
  }
  async findAllEntities(): Promise<CityEntity[]> {
    return await this.createQueryBuilder('city').getMany();
  }

  async cityPagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<CityEntity>> {
    return paginate(query, this, {
      sortableColumns: ['create_at'],
      nullSort: 'last',
      searchableColumns: ['name'],
      defaultSortBy: [['create_at', 'DESC']],
      filterableColumns: {
        name: [FilterOperator.ILIKE],
      },
    });
  }
}
