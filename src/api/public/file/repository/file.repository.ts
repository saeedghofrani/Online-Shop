import { Inject, Injectable } from '@nestjs/common';
import { FilterOperator, Paginated, paginate } from 'nestjs-paginate';
import { RepositoriesAbstract } from 'src/common/abstract/repositories.abstract';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { FileEntity } from 'src/entities/public/file.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { PostgresConstant } from '../../../../common/constants/postgres.constant';
import { CreateFileDto } from '../dto/create-file.dto';
import { UpdateFileDto } from '../dto/update-file.dto';
import { FileTypeEnum } from 'src/entities/public/enum/file-type.enum';

@Injectable()
export class FileRepository
  extends Repository<FileEntity>
  implements RepositoriesAbstract<FileEntity, CreateFileDto, UpdateFileDto>
{
  constructor(
    @Inject(PostgresConstant) private postgresDataSource: DataSource,
  ) {
    super(FileEntity, postgresDataSource.createEntityManager());
  }
  async createEntity(createEntityDto: CreateFileDto): Promise<FileEntity> {
    return await this.save(this.create(createEntityDto));
  }
  async updateEntity(
    id: string,
    updateEntityDto: UpdateFileDto,
  ): Promise<UpdateResult> {
    return await this.update(id, updateEntityDto);
  }
  async findOneEntity(id: string): Promise<FileEntity> {
    return await this.createQueryBuilder('file')
      .where('file.id=:id_file', { id_file: id })
      .andWhere('file.type != :type', { type: FileTypeEnum.HIDDEN })
      .getOne();
  }

  async findAllEntities(): Promise<FileEntity[]> {
    return await this.createQueryBuilder('file')
      .where('file.type != :type', { type: FileTypeEnum.HIDDEN })
      .getMany();
  }

  async findFile(type: FileTypeEnum, id: string): Promise<FileEntity[]> {
    return await this.createQueryBuilder('file')
      .where('file.id=:id_file', { id_file: id })
      .andWhere('file.type != :type', { type: FileTypeEnum.HIDDEN })
      .getMany();
  }

  async removeFile(id: string): Promise<UpdateResult> {
    return await this.update(id, { type: FileTypeEnum.HIDDEN });
  }

  async filePagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<FileEntity>> {
    return paginate(query, this, {
      sortableColumns: ['create_at'],
      nullSort: 'last',
      searchableColumns: ['type'],
      defaultSortBy: [['create_at', 'DESC']],
      filterableColumns: {
        relation_id: [FilterOperator.ILIKE],
        type: [FilterOperator.ILIKE],
      },
    });
  }
}
