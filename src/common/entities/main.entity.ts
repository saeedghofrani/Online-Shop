import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class MainEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @CreateDateColumn({
    update: false,
    default: new Date(Date.now()),
    select: false,
  })
  create_at: Date;

  @UpdateDateColumn({
    update: true,
    default: new Date(Date.now()),
    select: false,
  })
  update_at: Date;
}
