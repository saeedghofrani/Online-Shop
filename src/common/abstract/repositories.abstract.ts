import { UpdateResult } from 'typeorm';

export interface RepositoriesAbstract<A, B, C> {
  createEntity(createEntityDto: B): Promise<A>;

  updateEntity(id: string, updateEntityDto: C): Promise<UpdateResult>;
  findOneEntity(id: string): Promise<A>;
  findAllEntities(): Promise<A[]>;
}
