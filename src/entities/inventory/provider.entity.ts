import { Column, Entity, ManyToOne, OneToMany, Unique } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { UserEntity } from '../auth/user.entity';
import { ProviderStatus } from './enum/provider-status.enum';
import { SummaryEntity } from './summary.entity';
import { WebEntity } from './web.entity';

@Entity({ schema: 'inventory', name: 'provider' })
@Unique(['latitude', 'longitude'])
export class ProviderEntity extends MainEntity {
  @Column({ unique: true })
  address: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column({
    type: 'enum',
    enum: ProviderStatus,
    default: ProviderStatus.PENDING,
  })
  status: ProviderStatus;

  @OneToMany(() => SummaryEntity, (summaries) => summaries.provider)
  summaries: SummaryEntity[];

  @ManyToOne(() => UserEntity, (user) => user.providers)
  user: UserEntity;

  @OneToMany(() => WebEntity, (web) => web.provider)
  web: WebEntity[];
}
