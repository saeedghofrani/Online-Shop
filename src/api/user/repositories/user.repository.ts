import { RepositoriesAbstract } from 'src/common/abstract/repositories.abstract';
import { UserEntity } from 'src/entities/AUTH/user.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from '../dto/create.user.dto';
import { UpdateUserDto } from '../dto/update.user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { PostgresConstant } from 'src/common/constants/postgres.constant';

@Injectable()
export class UserRepository
  extends Repository<UserEntity>
  implements RepositoriesAbstract<UserEntity, CreateUserDto, UpdateUserDto>
{
  constructor(
    @Inject(PostgresConstant) private postgresDataSource: DataSource,
  ) {
    super(UserEntity, postgresDataSource.createEntityManager());
  }

  async createEntity(createEntityDto: CreateUserDto): Promise<UserEntity> {
    return await this.save(this.create(createEntityDto));
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.update(id, updateEntityDto);
  }

  async findOneEntity(id: string): Promise<UserEntity> {
    return await this.createQueryBuilder('user')
      .where('user.id = :userId', {
        id,
      })
      .getOne();
  }

  async findAllEntities(): Promise<UserEntity[]> {
    return await this.createQueryBuilder('user').getMany();
  }

  async findByEntity(searchTerm: string): Promise<UserEntity> {
    return await this.createQueryBuilder('user')
      .where(`user.mobile = :searchTerm OR user.email = :searchTerm `, {
        searchTerm,
      })
      .getOne();
  }
}
