import { Inject } from '@nestjs/common';
import { RepositoriesAbstract } from 'src/common/abstract/repositories.abstract';
import { PostgresConstant } from 'src/common/constants/postgres.constant';
import { AddressEntity } from 'src/entities/LOCATION/address.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { CreateAddressDto } from '../dto/create-address.dto';
import { UpdateAddressDto } from '../dto/update-address.dto';

export class AddressRepository
  extends Repository<AddressEntity>
  implements
    RepositoriesAbstract<AddressEntity, CreateAddressDto, UpdateAddressDto>
{
  constructor(
    @Inject(PostgresConstant) private postgresDataSource: DataSource,
  ) {
    super(AddressEntity, postgresDataSource.createEntityManager());
  }

  async createEntity(
    createEntityDto: CreateAddressDto,
  ): Promise<AddressEntity> {
    return await this.save(this.create(createEntityDto));
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdateAddressDto,
  ): Promise<UpdateResult> {
    return await this.update(id, updateEntityDto);
  }

  async findOneEntity(id: string): Promise<AddressEntity> {
    return await this.createQueryBuilder('address')
      .where('address.id=:address_id', { address_id: id })
      .getOne();
  }

  async findAllEntities(): Promise<AddressEntity[]> {
    return await this.createQueryBuilder('address').getMany();
  }
}
