import { Inject, Injectable } from '@nestjs/common';
import { Paginated, paginate, FilterOperator } from 'nestjs-paginate';
import { RepositoriesAbstract } from 'src/common/abstract/repositories.abstract';
import { PostgresConstant } from 'src/common/constants/postgres.constant';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { ProfileEntity } from 'src/entities/auth/profile.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';

@Injectable()
export class ProfileRepository
  extends Repository<ProfileEntity>
  implements
    RepositoriesAbstract<ProfileEntity, CreateProfileDto, UpdateProfileDto>
{
  constructor(
    @Inject(PostgresConstant) private postgresDatasource: DataSource,
  ) {
    super(ProfileEntity, postgresDatasource.createEntityManager());
  }

  async createEntity(
    createEntityDto: CreateProfileDto,
  ): Promise<ProfileEntity> {
    return await this.save(this.create(createEntityDto));
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdateProfileDto,
  ): Promise<UpdateResult> {
    return await this.update(id, updateEntityDto);
  }

  async findOneEntity(profileId: string): Promise<ProfileEntity> {
    return await this.createQueryBuilder('profile')
      .where('profile.id = :profileId', {
        profileId,
      })
      .getOne();
  }

  async findAllEntities(): Promise<ProfileEntity[]> {
    return await this.createQueryBuilder('profile').getMany();
  }

  async findByEntity(searchTerm: string): Promise<ProfileEntity> {
    return await this.createQueryBuilder('profile')
      .where(
        `profile.first_name = :searchTerm OR profile.last_name = :searchTerm`,
        {
          searchTerm,
        },
      )
      .getOne();
  }

  async profilePagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<ProfileEntity>> {
    return paginate(query, this, {
      sortableColumns: ['create_at'],
      nullSort: 'last',
      searchableColumns: ['first_name', 'last_name'],
      defaultSortBy: [['create_at', 'DESC']],
    });
  }
}
