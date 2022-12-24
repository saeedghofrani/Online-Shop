import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/entities/AUTH/role.entity';
import { RoleRepository } from '../repositories/role.repository';

@Injectable()
export class RoleService {
  constructor(
    private roleRepository:RoleRepository,
  ) {}

  async createEntity(createEntityDto: CreateRoleDto): Promise<RoleEntity> {
    return await this.roleRepository.createEntity(createEntityDto)
  }

  async findAllEntities(): Promise<RoleEntity[]> {
    return await this.roleRepository.findAllEntities()
  }

  async findByEntity(searchTerm: string): Promise<RoleEntity> {
    return await this.roleRepository.findByEntity(searchTerm)
  }

  async findOneEntity(roleId: string): Promise<RoleEntity> {
    return await this.roleRepository.findOneEntity(roleId)
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdateRoleDto,
  ): Promise<UpdateResult> {
    return await this.roleRepository.updateEntity(id,updateEntityDto)
  }
}
