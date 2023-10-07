import { Inject, Injectable } from '@nestjs/common';
import { Paginated, paginate, FilterOperator } from 'nestjs-paginate';
import { RepositoriesAbstract } from 'common/abstract/repositories.abstract';
import { PostgresConstant } from 'common/constants/postgres.constant';
import { PaginationQueryDto } from 'common/pagination/pagination-query.dto';
import { KycEntity } from 'entities/auth/kyc.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { CreateKycDto } from '../dto/create-kyc.dto';

@Injectable()
export class KycRepository
  extends Repository<KycEntity>
  implements RepositoriesAbstract<KycEntity, CreateKycDto>
{
  constructor(
    @Inject(PostgresConstant) private postgresDataSource: DataSource,
  ) {
    super(KycEntity, postgresDataSource.createEntityManager());
  }

  async createEntity(createEntityDto: CreateKycDto): Promise<KycEntity> {
    return await this.save(this.create(createEntityDto));
  }

  async updateEntity(
    id: string,
    updateEntityDto: never,
  ): Promise<UpdateResult> {
    return await this.update(id, updateEntityDto);
  }

  async findAllEntities(): Promise<KycEntity[]> {
    return await this.createQueryBuilder('kyc').getMany();
  }

  async findByEntity(searchTerm: string): Promise<KycEntity> {
    return await this.createQueryBuilder('kyc')
      .where(
        `kyc.father_name = :searchTerm OR kyc.birth_date = :searchTerm OR kyc.national_code = :searchTerm`,
        {
          searchTerm,
        },
      )
      .getOne();
  }

  async findOneEntity(kycId: string): Promise<KycEntity> {
    return await this.createQueryBuilder('kyc')
      .where('kyc.id = :kycId', {
        kycId,
      })
      .getOne();
  }

  async kycPagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<KycEntity>> {
    return paginate(query, this, {
      sortableColumns: ['id'],
      nullSort: 'last',
      searchableColumns: ['national_code', 'birth_date'],
      defaultSortBy: [['id', 'DESC']],
      filterableColumns: {
        national_code: [FilterOperator.ILIKE],
      },
    });
  }
}
