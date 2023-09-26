import { Column, Entity, ManyToOne } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { CategoryEntity } from './category.entity';
import { AttributeEntity } from './attribute.entity';
import { CategoryAttributeEnum } from './enum/category-attribute-type.enum';

@Entity({ schema: 'product', name: 'category_attribute' })
export class CategoryAttributeEntity extends MainEntity {
  @Column()
  filterable: boolean;

  @Column()
  priceable: boolean;

  @Column({
    type: 'enum',
    enum: CategoryAttributeEnum,
    default: CategoryAttributeEnum.NUMBER,
  })
  type: CategoryAttributeEnum;

  @ManyToOne(() => CategoryEntity, (category) => category.category_attribute)
  category: CategoryEntity;

  @ManyToOne(() => AttributeEntity, (attribute) => attribute.category_attribute)
  attribute: AttributeEntity;
}
