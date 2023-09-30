import {
  Column,
  Entity,
  OneToMany,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { ProductEntity } from './product.entity';
import { CategoryAttributeEntity } from './category-attribute.entity';

@Entity({ schema: 'product', name: 'category' })
@Tree('closure-table', {
  ancestorColumnName: (column) => 'ancestor_' + column.propertyName,
  descendantColumnName: (column) => 'descendant_' + column.propertyName,
})
export class CategoryEntity extends MainEntity {
  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  original_name: string;
  
  @Column()
  description: string;

  @TreeChildren()
  children: CategoryEntity[];

  @TreeParent()
  parent: CategoryEntity;

  @OneToMany(() => ProductEntity, (products) => products.category)
  products: ProductEntity[];

  @OneToMany(
    () => CategoryAttributeEntity,
    (category_attribute) => category_attribute.category,
  )
  category_attribute: CategoryAttributeEntity[];
}
