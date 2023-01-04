import {Repository, UpdateResult} from "typeorm";
import {PricingEntity} from "../../../../entities/WALLET/pricing.entity";
import {RepositoriesAbstract} from "../../../../common/abstract/repositories.abstract";
import {CreatePricingDto} from "../dto/create-pricing.dto";
import {UpdatePricingDto} from "../dto/update-pricing.dto";
import {Injectable} from "@nestjs/common";

@Injectable()
export class PricingRepository extends Repository<PricingEntity> implements RepositoriesAbstract<PricingEntity,CreatePricingDto, UpdatePricingDto>{
    async createEntity(createEntityDto: CreatePricingDto): Promise<PricingEntity> {
        return await this.save(this.create(createEntityDto))
    }

    async findAllEntities(): Promise<PricingEntity[]> {
        return await this.createQueryBuilder("pricing").getMany()
    }

    async findOneEntity(id: string): Promise<PricingEntity> {
        return await this.createQueryBuilder("pricing").where("pricing.id=:id_pricing",{id_pricing:id}).getOne()
    }

    async updateEntity(id: string, updateEntityDto: UpdatePricingDto): Promise<UpdateResult> {
        return await this.update(id,updateEntityDto)
    }

}