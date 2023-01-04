import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { PaymentEntity } from '../../../../entities/WALLET/payment.entity';
import { RepositoriesAbstract } from '../../../../common/abstract/repositories.abstract';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { UpdatePaymentDto } from '../dto/update-payment.dto';
import { PostgresConstant } from '../../../../common/constants/postgres.constant';

@Injectable()
export class PaymentRepository
  extends Repository<PaymentEntity>
  implements
    RepositoriesAbstract<PaymentEntity, CreatePaymentDto, UpdatePaymentDto>
{
  constructor(
    @Inject(PostgresConstant) private postgresDataSource: DataSource,
  ) {
    super(PaymentEntity, postgresDataSource.createEntityManager());
  }

  async createEntity(
    createEntityDto: CreatePaymentDto,
  ): Promise<PaymentEntity> {
    return await this.save(this.create(createEntityDto));
  }

  async findAllEntities(): Promise<PaymentEntity[]> {
    return await this.createQueryBuilder('payment').getMany();
  }

  async findOneEntity(id: string): Promise<PaymentEntity> {
    return await this.createQueryBuilder('payment')
      .where('payment.id=:payment_id', { payment_id: id })
      .getOne();
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdatePaymentDto,
  ): Promise<UpdateResult> {
    return await this.update(id, updateEntityDto);
  }
}
