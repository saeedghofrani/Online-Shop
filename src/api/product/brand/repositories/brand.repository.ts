import { Inject, Injectable } from '@nestjs/common';
import { RepositoriesAbstract } from 'src/common/abstract/repositories.abstract';
import { PostgresConstant } from 'src/common/constants/postgres.constant';
import { BrandEntity } from 'src/entities/PRODUCT/brand.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';

@Injectable()
export class BrandRepository
  extends Repository<BrandEntity>
  implements RepositoriesAbstract<BrandEntity, CreateBrandDto, UpdateBrandDto>
{
  constructor(
    @Inject(PostgresConstant) private postgresDataSource: DataSource,
  ) {
    super(BrandEntity, postgresDataSource.createEntityManager());
  }
  async createEntity(createEntityDto: CreateBrandDto): Promise<BrandEntity> {
    return await this.save(this.create(createEntityDto));
  }
  async updateEntity(
    id: string,
    updateEntityDto: UpdateBrandDto,
  ): Promise<UpdateResult> {
    return await this.update(id, updateEntityDto);
  }
  async findOneEntity(id: string): Promise<BrandEntity> {
    return await this.createQueryBuilder('brand')
      .where('brand.id=:brand_id', { brand_id: id })
      .getOne();
  }
  async findAllEntities(): Promise<BrandEntity[]> {
    return await this.createQueryBuilder('brand').getMany();
  }
}
