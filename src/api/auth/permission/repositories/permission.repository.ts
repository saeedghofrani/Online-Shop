import { Inject, Injectable } from '@nestjs/common';
import { RepositoriesAbstract } from 'src/common/abstract/repositories.abstract';
import { PermissionEntity } from 'src/entities/AUTH/permission.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';

@Injectable()
export class PermissionRepository
  extends Repository<PermissionEntity>
  implements
    RepositoriesAbstract<
      PermissionEntity,
      CreatePermissionDto,
      UpdatePermissionDto
    >
{
  constructor(@Inject() private postgresDataSource: DataSource) {
    super(PermissionEntity, postgresDataSource.createEntityManager());
  }
  async createEntity(
    createEntityDto: CreatePermissionDto,
  ): Promise<PermissionEntity> {
    return await this.save(this.create(createEntityDto));
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdatePermissionDto,
  ): Promise<UpdateResult> {
    return await this.update(id, updateEntityDto);
  }

  async findAllEntities(): Promise<PermissionEntity[]> {
    return await this.createQueryBuilder('permission').getMany();
  }

  async findByEntity(searchTerm: string): Promise<PermissionEntity> {
    return await this.createQueryBuilder('permission')
      .where(`permission.name = :searchTerm`, {
        searchTerm,
      })
      .getOne();
  }

  async findOneEntity(permissionId: string): Promise<PermissionEntity> {
    return await this.createQueryBuilder('permission')
      .where('permission.id = :permissionId', {
        permissionId,
      })
      .getOne();
  }
}
