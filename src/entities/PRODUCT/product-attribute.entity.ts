import { Column, Entity, ManyToOne } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { AttributeEntity } from './attribute.entity';
import { ProductEntity } from './product.entity';

@Entity({ schema: 'product', name: 'product-attribute' })
export class ProductAttributeEntity extends MainEntity {
    @ManyToOne(() => ProductEntity, product => product.product_attributes)
    product: ProductEntity;
    
    @ManyToOne(() => AttributeEntity, attribute => attribute.product_attributes)
    attribute: AttributeEntity;
    
    @Column()
    value: string;

    @Column()
    unit: string;
}