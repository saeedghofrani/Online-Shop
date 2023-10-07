import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { AttributeEntity } from './attribute.entity';

@Entity({ schema: 'product', name: 'attribute_value' })
export class AttributeValueEntity extends MainEntity {
  @Column()
  value: string;

  @ManyToOne(() => AttributeEntity, (attribute) => attribute.attributes_value)
  attribute: AttributeEntity;

  @DeleteDateColumn()
  delete_at: Date;
}
