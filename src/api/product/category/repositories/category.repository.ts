import { Inject } from '@nestjs/common';
import { Paginated, paginate, FilterOperator } from 'nestjs-paginate';
import { RepositoriesAbstract } from 'src/common/abstract/repositories.abstract';
import { PostgresConstant } from 'src/common/constants/postgres.constant';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { CategoryEntity } from 'src/entities/PRODUCT/category.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

export class CategoryRepository
  extends Repository<CategoryEntity>
  implements
    RepositoriesAbstract<CategoryEntity, CreateCategoryDto, UpdateCategoryDto>
{
  constructor(
    @Inject(PostgresConstant) private postgresDataSource: DataSource,
  ) {
    super(CategoryEntity, postgresDataSource.createEntityManager());
  }
  async createEntity(
    createEntityDto: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    return await this.save(this.create(createEntityDto));
  }
  async updateEntity(
    id: string,
    updateEntityDto: UpdateCategoryDto,
  ): Promise<UpdateResult> {
    return await this.update(id, updateEntityDto);
  }
  async findOneEntity(id: string): Promise<CategoryEntity> {
    return await this.createQueryBuilder('category')
      .where('category.id=:category_id', { category_id: id })
      .getOne();
  }
  async findAllEntities(): Promise<CategoryEntity[]> {
    return await this.createQueryBuilder('category').getMany();
  }
  async findTree(): Promise<CategoryEntity[]> {
    return await this.manager.getTreeRepository(CategoryEntity).findTrees();
  }

  async categoryPagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<CategoryEntity>> {
    return paginate(query, this, {
      sortableColumns: ['create_at'],
      nullSort: 'last',
      searchableColumns: ['name', 'description'],
      defaultSortBy: [['create_at', 'DESC']],
      filterableColumns: {
        name: [FilterOperator.ILIKE],
      },
    });
  }
}
