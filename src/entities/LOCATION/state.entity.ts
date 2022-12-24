import { Column, Entity, OneToOne } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { CityEntity } from './city.entity';

@Entity({ schema: 'LOCATION', name: 'state' })
export class StateEntity extends MainEntity {
  @Column()
  name: string;

  @OneToOne(() => CityEntity)
  city: CityEntity;
}
