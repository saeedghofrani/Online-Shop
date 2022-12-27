import { Column, Entity } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';

@Entity({ schema: 'product', name: 'brand' })
export class BrandEntity extends MainEntity {
    @Column({unique: true})
    name: string;

  @Column()
  description: string;

  @Column()
  status: boolean;
}
