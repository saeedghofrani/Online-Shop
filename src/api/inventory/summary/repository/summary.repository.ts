import { Inject } from "@nestjs/common";
import { RepositoriesAbstract } from "src/common/abstract/repositories.abstract";
import { PostgresConstant } from "src/common/constants/postgres.constant";
import { SummaryEntity } from "src/entities/INVENTORY/summary.entity";
import { DataSource, Repository, UpdateResult } from "typeorm";
import { CreateSummaryDto } from "../dto/create-summary.dto";
import { UpdateSummaryDto } from "../dto/update-summary.dto";

export class SummaryRepository extends Repository<SummaryEntity> implements RepositoriesAbstract<SummaryEntity,CreateSummaryDto, UpdateSummaryDto> {
    constructor(
        @Inject(PostgresConstant) private postgresDataSource: DataSource,
    ) {
        super(SummaryEntity, postgresDataSource.createEntityManager());
    }

    async createEntity(
        createEntityDto: CreateSummaryDto,
      ): Promise<SummaryEntity> {
        return await this.save(this.create(createEntityDto));
      }
    
      async updateEntity(
        id: string,
        updateEntityDto: UpdateSummaryDto,
      ): Promise<UpdateResult> {
        return await this.update(id, updateEntityDto);
      }
    
      async findAllEntities(): Promise<SummaryEntity[]> {
        return await this.createQueryBuilder('summary').getMany();
      }
    
      async findByEntity(searchTerm: string): Promise<SummaryEntity> {
        return await this.createQueryBuilder('summary')
          .where(`summary.description = :searchTerm OR summary.count = :count OR summary.minimum = :minimum OR summary.unit = :unit`, {
            searchTerm,
          })
          .getOne();
      }
    
      async findOneEntity(summaryId: string): Promise<SummaryEntity> {
        return await this.createQueryBuilder('summary')
          .where('summary.id = :summary', {
            summaryId,
          })
          .getOne();
      }
}