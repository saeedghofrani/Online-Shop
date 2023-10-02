import { Column, DeleteDateColumn, Entity, ManyToOne } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { AttributeEntity } from './attribute.entity';
import { CategoryEntity } from './category.entity';

@Entity({ schema: 'product', name: 'category_attribute' })
export class CategoryAttributeEntity extends MainEntity {
  @Column()
  filterable: boolean;

  @Column()
  priceable: boolean;

  @DeleteDateColumn()
  delete_at: Date

  @ManyToOne(() => CategoryEntity, (category) => category.category_attribute)
  category: CategoryEntity;

  @ManyToOne(() => AttributeEntity, (attribute) => attribute.category_attribute)
  attribute: AttributeEntity;
}
