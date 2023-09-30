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
    return await this.manager.save(this.create(createEntityDto));
  }
  async updateEntity(
    id: string,
    updateEntityDto: UpdateCategoryDto,
  ): Promise<UpdateResult> {
    delete updateEntityDto.parent_id;
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

  async findRoots() {
    return await this.query(`
    select "name", description , id, original_name , (select count(*) from product.category c2 where c2."parentId" = c.id) as descendants from product.category c where c."parentId" is null 
      `);
  }

  async findChildren(parent_id: number) {
    return await this.query(`
      select "name", description , id, original_name , (select count(*) from product.category c2 where c2."parentId" = c.id) as descendants from product.category c where c."parentId"  = ${parent_id}
      `);
  }

  async removeCategory(id: number) {
    const category = await this.createQueryBuilder('category')
      .where('category.id = :id', { id })
      .getOne();
    category.softRemove();
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
