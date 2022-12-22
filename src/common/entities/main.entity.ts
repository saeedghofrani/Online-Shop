import {
  BaseEntity,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export class MainEntity extends BaseEntity {
  @PrimaryColumn({ nullable: false, type: 'uuid', primary: true, unique: true })
  id: string;

  @CreateDateColumn({ update: false, default: Date.now() })
  create_at: Date;

  @UpdateDateColumn({ update: true, default: Date.now() })
  update_at: Date;
}
