import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { AttributeEntity } from './attribute.entity';
import { CategoryEntity } from './category.entity';

@Entity({ schema: 'PRODUCT', name: 'group' })
export class GroupEntity extends MainEntity {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => CategoryEntity, (categories) => categories.group)
  categories: CategoryEntity[];

  @ManyToMany(() => AttributeEntity, (attributes) => attributes.groups)
  @JoinTable({ name: 'group_attribute' })
  attributes: AttributeEntity[];
}
