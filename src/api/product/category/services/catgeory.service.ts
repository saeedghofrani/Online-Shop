import { Injectable } from '@nestjs/common';
import { Paginated } from 'nestjs-paginate';
import { RepositoriesAbstract } from 'src/common/abstract/repositories.abstract';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { CategoryEntity } from 'src/entities/PRODUCT/category.entity';
import { UpdateResult } from 'typeorm';
import { GroupService } from '../../group/services/group.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable()
export class CategoryService {
  constructor(
    private categoryRepository: CategoryRepository,
    private groupService: GroupService,
  ) {}

  async createEntity(
    createEntityDto: CreateCategoryDto,
    group_id: string,
  ): Promise<CategoryEntity> {
    const findGroup = await this.groupService.findOneEntity(group_id);
    createEntityDto.group = findGroup;
    return await this.categoryRepository.createEntity(createEntityDto);
  }
  async updateEntity(
    id: string,
    updateEntityDto: UpdateCategoryDto,
    group_id: string,
  ): Promise<UpdateResult> {
    if (group_id) {
      const findGroup = await this.groupService.findOneEntity(group_id);
      updateEntityDto.group = findGroup;
    }

    return await this.categoryRepository.updateEntity(id, updateEntityDto);
  }
  async findOneEntity(id: string): Promise<CategoryEntity> {
    return await this.categoryRepository.findOneEntity(id);
  }
  async findAllEntities(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.findAllEntities();
  }

  async categoryPagination(query:PaginationQueryDto):Promise<Paginated<CategoryEntity>>
  {
    return this.categoryRepository.categoryPagination(query)
  }
}
