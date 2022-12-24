import { Inject, Injectable } from '@nestjs/common';
import { RepositoriesAbstract } from 'src/common/abstract/repositories.abstract';
import { PostgresConstant } from 'src/common/constants/postgres.constant';
import { KycEntity } from 'src/entities/AUTH/kyc.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { CreateKycDto } from '../dto/create.kyc.dto';

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
}
