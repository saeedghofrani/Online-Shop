import { Inject, Injectable } from '@nestjs/common';
import { Paginated, paginate, FilterOperator } from 'nestjs-paginate';
import { RepositoriesAbstract } from 'src/common/abstract/repositories.abstract';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { InstallmentEntity } from 'src/entities/wallet/installment.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { PostgresConstant } from '../../../../common/constants/postgres.constant';
import { CreateInstallmentDto } from '../dto/create-installment.dto';
import { UpdateInstallmentDto } from '../dto/update-installment.dto';

@Injectable()
export class InstallmentRepository
  extends Repository<InstallmentEntity>
  implements
    RepositoriesAbstract<
      InstallmentEntity,
      CreateInstallmentDto,
      UpdateInstallmentDto
    >
{
  constructor(
    @Inject(PostgresConstant) private postgresDataSource: DataSource,
  ) {
    super(InstallmentEntity, postgresDataSource.createEntityManager());
  }
  async createEntity(
    createEntityDto: CreateInstallmentDto,
  ): Promise<InstallmentEntity> {
    return await this.save(this.create(createEntityDto));
  }
  async updateEntity(
    id: string,
    updateEntityDto: UpdateInstallmentDto,
  ): Promise<UpdateResult> {
    return await this.update(id, updateEntityDto);
  }
  async findOneEntity(id: string): Promise<InstallmentEntity> {
    return await this.createQueryBuilder('installment')
      .where('installment.id=:id_installment', { id_installment: id })
      .getOne();
  }
  async findAllEntities(): Promise<InstallmentEntity[]> {
    return await this.createQueryBuilder('installment').getMany();
  }

  async installmentPagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<InstallmentEntity>> {
    return paginate(query, this, {
      sortableColumns: ['create_at'],
      nullSort: 'last',
      defaultSortBy: [['create_at', 'DESC']],
      filterableColumns: {
        priec: [FilterOperator.EQ],
        dou_date: [FilterOperator.BTW],
      },
    });
  }
}
