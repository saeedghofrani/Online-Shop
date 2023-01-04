import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, Patch, Post, Query} from "@nestjs/common";
import {PricingService} from "../services/pricing.service";
import {RepositoriesAbstract} from "../../../../common/abstract/repositories.abstract";
import {PricingEntity} from "../../../../entities/WALLET/pricing.entity";
import {CreatePricingDto} from "../dto/create-pricing.dto";
import {UpdatePricingDto} from "../dto/update-pricing.dto";
import {UpdateResult} from "typeorm";

@ApiBearerAuth('access-token')
@ApiTags('Account')
@Controller('account')
export class PricingController{
    constructor(private pricingService:PricingService) {
    }

    @Post()
    createEntity(@Body() createEntityDto: CreatePricingDto,@Query("product_id") productId:string): Promise<PricingEntity> {
        return this.pricingService.createEntity(createEntityDto, productId)
    }

    @Get("all")
    findAllEntities(): Promise<PricingEntity[]> {
        return this.pricingService.findAllEntities()
    }

    @Get()
    findOneEntity(@Query("pricing_id") id: string): Promise<PricingEntity> {
        return this.pricingService.findOneEntity(id)
    }

    @Patch()
    updateEntity(@Query("pricing_id") id: string, @Body() updateEntityDto: UpdatePricingDto,@Query("product_id") productId:string): Promise<UpdateResult> {
        return this.pricingService.updateEntity(id, updateEntityDto, productId)
    }


}