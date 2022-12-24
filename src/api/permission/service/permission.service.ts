import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from 'src/entities/AUTH/profile.entity';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { PermissionEntity } from '../../../entities/AUTH/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionEntity)
    private permissionRepository: Repository<PermissionEntity>,
  ) {}

  async createEntity(
    createEntityDto: CreatePermissionDto,
  ): Promise<PermissionEntity> {
    return await this.permissionRepository.save(
      this.permissionRepository.create(createEntityDto),
    );
  }

  async findAllEntities(): Promise<PermissionEntity[]> {
    return await this.permissionRepository
      .createQueryBuilder('permission')
      .getMany();
  }

  async findByEntity(searchTerm: string): Promise<PermissionEntity> {
    return await this.permissionRepository
      .createQueryBuilder('permission')
      .where(`permission.name = :searchTerm`, {
        searchTerm,
      })
      .getOne();
  }

  async findOneEntity(permissionId: string): Promise<PermissionEntity> {
    return await this.permissionRepository
      .createQueryBuilder('permission')
      .where('permission.id = :permissionId', {
        permissionId,
      })
      .getOne();
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdatePermissionDto,
  ): Promise<UpdateResult> {
    const permissionEntity = await this.findOneEntity(id);
    return await this.permissionRepository.update(
      permissionEntity.id,
      updateEntityDto,
    );
  }
}
