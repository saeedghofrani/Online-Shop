import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class MainEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;
}
