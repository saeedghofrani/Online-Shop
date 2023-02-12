import { Injectable } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { RoleEntity } from 'src/entities/AUTH/role.entity';
import { RoleRepository } from '../repositories/role.repository';
import { Paginated } from 'nestjs-paginate';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';

@Injectable()
export class RoleService {
  constructor(private roleRepository: RoleRepository) {}

  async createEntity(createEntityDto: CreateRoleDto): Promise<RoleEntity> {
    return await this.roleRepository.createEntity(createEntityDto);
  }

  async findAllEntities(): Promise<RoleEntity[]> {
    return await this.roleRepository.findAllEntities();
  }

  async findByEntity(searchTerm: string): Promise<RoleEntity> {
    return await this.roleRepository.findByEntity(searchTerm);
  }

  async findOneEntity(roleId: string): Promise<RoleEntity> {
    return await this.roleRepository.findOneEntity(roleId);
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdateRoleDto,
  ): Promise<UpdateResult> {
    return await this.roleRepository.updateEntity(id, updateEntityDto);
  }

  async getRoleDefault() {
    return await this.roleRepository.getRoleDefault();
  }

  async findRolesByIds(ids: string[]): Promise<RoleEntity[]> {
    return await this.roleRepository.findRolesByIds(ids);
  }

  async rolePagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<RoleEntity>> {
    return this.roleRepository.rolePagination(query);
  }
}
