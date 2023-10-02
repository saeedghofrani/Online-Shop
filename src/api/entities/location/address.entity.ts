import { Column, Entity, ManyToOne } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { UserEntity } from '../auth/user.entity';
import { CityEntity } from './city.entity';

@Entity({ schema: 'location', name: 'address' })
export class AddressEntity extends MainEntity {
  @Column()
  address: string;

  @Column()
  building_number: string;

  @Column()
  full_name: string;

  @Column()
  is_default: boolean;

  @Column({ type: 'numeric' })
  latitude: string;

  @Column({ type: 'numeric' })
  longitude: string;

  @Column()
  postal_code: string;

  @Column()
  telephone: string;

  @ManyToOne(() => UserEntity, (user) => user.addresses)
  user: UserEntity;

  @ManyToOne(() => CityEntity, (city) => city.address)
  city: CityEntity;
}
