import { Column, Entity, ManyToMany } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { GroupEntity } from './group.entity';

@Entity({ schema: 'PRODUCT', name: 'attribute' })
export class AttributeEntity extends MainEntity {
    @Column({unique: true})
    name: string;

    @ManyToMany(() => GroupEntity, (groups) => groups.attributes)
    groups: GroupEntity[];
}