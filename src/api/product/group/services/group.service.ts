import { Injectable } from '@nestjs/common';
import { Paginated } from 'nestjs-paginate';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { GroupEntity } from 'src/entities/PRODUCT/group.entity';
import { UpdateResult } from 'typeorm';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { GroupRepository } from '../repositories/group.repository';

@Injectable()
export class GroupService {
  constructor(private groupRepository: GroupRepository) {}

  async createEntity(createEntityDto: CreateGroupDto): Promise<GroupEntity> {
    return await this.groupRepository.createEntity(createEntityDto);
  }
  async updateEntity(
    id: string,
    updateEntityDto: UpdateGroupDto,
  ): Promise<UpdateResult> {
    return await this.groupRepository.updateEntity(id, updateEntityDto);
  }
  async findOneEntity(id: string): Promise<GroupEntity> {
    return await this.groupRepository.findOneEntity(id);
  }
  async findAllEntities(): Promise<GroupEntity[]> {
    return await this.groupRepository.findAllEntities();
  }

  async groupPagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<GroupEntity>> {
    return this.groupRepository.groupPagination(query);
  }
}
