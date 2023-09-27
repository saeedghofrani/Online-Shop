import { Column, Entity, OneToMany } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { CategoryAttributeEntity } from './category-attribute.entity';
import { AttributeValueEntity } from './attribute-value.entity';
import { AttributeEnum } from './enum/category-attribute-type.enum';

@Entity({ schema: 'product', name: 'attribute' })
export class AttributeEntity extends MainEntity {
  @Column({ unique: true })
  name: string;

  @Column({
    type: 'enum',
    enum: AttributeEnum,
    default: AttributeEnum.NUMBER,
  })
  type: AttributeEnum;

  @OneToMany(
    () => CategoryAttributeEntity,
    (category_attribute) => category_attribute.category,
  )
  category_attribute: CategoryAttributeEntity[];

  @OneToMany(
    () => AttributeValueEntity,
    (attributes_value) => attributes_value.attribute,
  )
  attributes_value: AttributeValueEntity[];
}
