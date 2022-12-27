import { Inject } from "@nestjs/common";
import { RepositoriesAbstract } from "src/common/abstract/repositories.abstract";
import { PostgresConstant } from "src/common/constants/postgres.constant";
import { ProviderEntity } from "src/entities/INVENTORY/provider.entity";
import { DataSource, Repository, UpdateResult } from "typeorm";
import { CreateProviderDto } from "../dto/create-provider.dto";
import { UpdateProviderStatusDto } from "../dto/update-provider-status.dto";
import { UpdateProviderDto } from "../dto/update-provider.dto";

export class ProviderRepository extends Repository<ProviderEntity> implements RepositoriesAbstract<ProviderEntity,CreateProviderDto, UpdateProviderDto> {
    constructor(
        @Inject(PostgresConstant) private postgresDataSource: DataSource,
    ) {
        super(ProviderEntity, postgresDataSource.createEntityManager());
    }

    async createEntity(
        createEntityDto: CreateProviderDto,
      ): Promise<ProviderEntity> {
        return await this.save(this.create(createEntityDto));
      }
    
      async updateEntity(
        id: string,
        updateEntityDto: UpdateProviderDto,
      ): Promise<UpdateResult> {
        return await this.update(id, updateEntityDto);
      }
    
      async findAllEntities(): Promise<ProviderEntity[]> {
        return await this.createQueryBuilder('provider').getMany();
      }
    
      async findByEntity(searchTerm: string): Promise<ProviderEntity> {
        return await this.createQueryBuilder('provider')
          .where(`provider.latitude = :latitude OR provider.longitude = :longitude OR provider.status = :status`, {
            searchTerm,
          })
          .getOne();
      }
    
      async findOneEntity(providerId: string): Promise<ProviderEntity> {
        return await this.createQueryBuilder('provider')
          .where('provider.id = :providerId', {
            providerId,
          })
          .getOne();
      }

      async UpdateProviderStatus(providerId: string, updateProviderStatusDto: UpdateProviderStatusDto): Promise<UpdateResult> {
        return await this.update(providerId, updateProviderStatusDto);
      }
}