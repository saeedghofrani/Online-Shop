import { Injectable } from '@nestjs/common';
import { PermissionEntity } from 'src/entities/AUTH/permission.entity';
import { UpdateResult } from 'typeorm';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { PermissionRepository } from '../repositories/permission.repository';

@Injectable()
export class PermissionService {
  constructor(private permissionRepository: PermissionRepository) {}

  async createEntity(
    createEntityDto: CreatePermissionDto,
  ): Promise<PermissionEntity> {
    return await this.permissionRepository.createEntity(createEntityDto);
  }

  async findAllEntities(): Promise<PermissionEntity[]> {
    return await this.permissionRepository.findAllEntities();
  }

  async findByEntity(searchTerm: string): Promise<PermissionEntity> {
    return await this.permissionRepository.findByEntity(searchTerm);
  }

  async findOneEntity(permissionId: string): Promise<PermissionEntity> {
    return await this.permissionRepository.findOneEntity(permissionId);
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdatePermissionDto,
  ): Promise<UpdateResult> {
    return await this.permissionRepository.updateEntity(id, updateEntityDto);
  }
}
