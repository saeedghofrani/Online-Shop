import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { GroupEntity } from './group.entity';
import { ProductEntity } from './product.entity';

@Entity({ schema: 'PRODUCT', name: 'category' })
export class CategoryEntity extends MainEntity {
    @Column({unique: true})
    name: string;

    @Column()
    description: string;

    @OneToMany(() => ProductEntity, (products) => products.category)
    products: ProductEntity[];

    @ManyToOne(() => GroupEntity, (group) => group.categories)
    group: GroupEntity;
}