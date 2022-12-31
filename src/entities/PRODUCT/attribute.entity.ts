import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { GroupEntity } from './group.entity';
import { ProductAttributeEntity } from './product-attribute.entity';

@Entity({ schema: 'product', name: 'attribute' })
export class AttributeEntity extends MainEntity {
  @Column({ unique: true })
  name: string;

  @ManyToMany(() => GroupEntity, (groups) => groups.attributes)
  groups: GroupEntity[];

  @OneToMany(() => ProductAttributeEntity, (product_attributes) => product_attributes.product)
  product_attributes: ProductAttributeEntity[];
}
