import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { SummaryEntity } from './summary.entity';

@Entity({ schema: 'INVENTORY', name: 'repo' })
@Unique(["latitude", "longitude"])
export class RepoEntity extends MainEntity {
    @Column({unique: true})
    address: string;

    @Column()
    latitude: string;

    @Column()
    longitude: string;

    @OneToMany(() => SummaryEntity, (summaries) => summaries.repo)
    summaries: SummaryEntity[];
}