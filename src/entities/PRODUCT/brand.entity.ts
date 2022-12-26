import { Column, Entity } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';

@Entity({ schema: 'PRODUCT', name: 'category' })
export class CategoryEntity extends MainEntity {
    @Column({unique: true})
    name: string;

    @Column()
    description: string;

    @Column()
    status: boolean;
}