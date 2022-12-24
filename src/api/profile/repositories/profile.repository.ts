import { Inject, Injectable } from '@nestjs/common';
import { RepositoriesAbstract } from 'src/common/abstract/repositories.abstract';
import { PostgresConstant } from 'src/common/constants/postgres.constant';
import { ProfileEntity } from 'src/entities/AUTH/profile.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { CreateProfileDto } from '../dto/create.profile.dto';
import { UpdateProfileDto } from '../dto/update.profile.dto';

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
}
