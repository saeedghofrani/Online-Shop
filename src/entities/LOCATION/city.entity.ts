import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { KycEntity } from '../AUTH/kyc.entity';
import { AddressEntity } from './address.entity';
import { StateEntity } from './state.entity';

@Entity({ schema: 'LOCATION', name: 'city' })
export class CityEntity extends MainEntity {
  @Column()
  name: string;

  @OneToOne(() => StateEntity)
  @JoinColumn()
  state: StateEntity;

  @OneToMany(() => AddressEntity, (address) => address.city)
  address: AddressEntity[];
}
