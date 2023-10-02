import { Column, DeleteDateColumn, Entity, ManyToOne } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { ProviderEntity } from './provider.entity';

@Entity({ schema: 'inventory', name: 'web' })
export class WebEntity extends MainEntity {
  @Column()
  name: string;

  @Column()
  original_name: string;

  @ManyToOne(() => ProviderEntity, (provider) => provider.web)
  provider: ProviderEntity;

  @DeleteDateColumn({})
  delete_at?: Date;
}
