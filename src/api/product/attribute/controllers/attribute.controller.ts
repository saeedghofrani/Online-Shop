import { Body, Controller, Get, Patch, Post, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { create } from "domain";
import { AttributeEntity } from "src/entities/PRODUCT/attribute.entity";
import { UpdateResult } from "typeorm";
import { CreateAttributeDto } from "../dto/create-attribute.dto";
import { UpdateAttributeDto } from "../dto/update-attribute.dto";
import { AttributeService } from "../services/attribute.service";

@ApiBearerAuth('access-token')
@ApiTags('Attribute')
@Controller('attribute')
export class AttributeController{
    constructor(private attributeService:AttributeService){}

    @Post()
     createEntity(@Body() createEntityDto: CreateAttributeDto): Promise<AttributeEntity>
    {
        return this.attributeService.createEntity(createEntityDto)
    }

    @Patch()
    updateEntity(@Query("attribute_id") id: string,@Body() updateEntityDto: UpdateAttributeDto): Promise<UpdateResult>
    {
        return this.attributeService.updateEntity(id,updateEntityDto)
    }

    @Get()
    findOneEntity(@Query("attribute_id") id: string): Promise<AttributeEntity>
    {
        return this.attributeService.findOneEntity(id)
    }

    @Get("all")
    async findAllEntities(): Promise<AttributeEntity[]> 
    {
        return this.attributeService.findAllEntities()
    }
}
