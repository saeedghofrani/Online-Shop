import { Column, Entity, ManyToOne } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { ProductEntity } from '../PRODUCT/product.entity';
import { RepoEntity } from './repo.entity';

@Entity({ schema: 'INVENTORY', name: 'summary' })
export class SummaryEntity extends MainEntity {
    @Column()
    description: string;

    @ManyToOne(() => RepoEntity, (repo) => repo.summaries)
    repo: RepoEntity;

    @ManyToOne(() => ProductEntity, (product) => product.summaries)
    product: ProductEntity;
}