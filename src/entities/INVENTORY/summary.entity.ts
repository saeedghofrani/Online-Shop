import { Column, Entity, ManyToOne } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { ProductEntity } from '../PRODUCT/product.entity';
import { ProviderEntity } from './provider.entity';

@Entity({ schema: 'inventory', name: 'summary' })
export class SummaryEntity extends MainEntity {
  @Column()
  description: string;

  @Column({ type: 'numeric' })
  count: string;

  @Column()
  minimum: number;

  @Column()
  unit: string;

  @ManyToOne(() => ProviderEntity, (repo) => repo.summaries)
  provider: ProviderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.summaries)
  product: ProductEntity;
}
