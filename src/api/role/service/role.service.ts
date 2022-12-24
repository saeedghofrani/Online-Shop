import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/entities/AUTH/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  async createEntity(createEntityDto: CreateRoleDto): Promise<RoleEntity> {
    return await this.roleRepository.save(
      this.roleRepository.create(createEntityDto),
    );
  }

  async findAllEntities(): Promise<RoleEntity[]> {
    return await this.roleRepository.createQueryBuilder('role').getMany();
  }

  async findByEntity(searchTerm: string): Promise<RoleEntity> {
    return await this.roleRepository
      .createQueryBuilder('role')
      .where(`role.name = :searchTerm`, {
        searchTerm,
      })
      .getOne();
  }

  async findOneEntity(roleId: string): Promise<RoleEntity> {
    return await this.roleRepository
      .createQueryBuilder('role')
      .where('role.id = :roleId', {
        roleId,
      })
      .getOne();
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdateRoleDto,
  ): Promise<UpdateResult> {
    const roleEntity = await this.findOneEntity(id);
    return await this.roleRepository.update(roleEntity.id, updateEntityDto);
  }
}
