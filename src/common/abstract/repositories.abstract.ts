export interface RepositoriesAbstract<A, B, C> {
  createEntity(createEntityDto: B): Promise<A>;
  updateEntity(updateEntityDto: C): Promise<A>;
  findOneEntity(): Promise<A>;
  findAllEntities(): Promise<A[]>;
}
