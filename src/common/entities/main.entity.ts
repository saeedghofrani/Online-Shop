import {
  BaseEntity,
  CreateDateColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class MainEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @CreateDateColumn({ update: false, default: new Date(Date.now()) })
  create_at: Date;

  @UpdateDateColumn({ update: true, default: new Date(Date.now()) })
  update_at: Date;
}
