import { Injectable } from "@nestjs/common";
import { time } from "console";
import { AttributeEntity } from "src/entities/PRODUCT/attribute.entity";
import { UpdateResult } from "typeorm";
import { CreateAttributeDto } from "../dto/create-attribute.dto";
import { UpdateAttributeDto } from "../dto/update-attribute.dto";
import { AttributeRepository } from "../repositories/attribute.repository";

@Injectable()
export class AttributeService{
    constructor(private attributeRepository:AttributeRepository){}

    async createEntity(createEntityDto: CreateAttributeDto): Promise<AttributeEntity>
    {
        try {
            return await this.attributeRepository.createEntity(createEntityDto)
        } catch (e) {
            
        }
    }

    async updateEntity(id: string, updateEntityDto: UpdateAttributeDto): Promise<UpdateResult> {
    try {
        return await this.attributeRepository.updateEntity(id,updateEntityDto)
    } catch (e) {
        
    }
    }

    async findOneEntity(id: string): Promise<AttributeEntity> {
    try {
        return await this.attributeRepository.findOneEntity(id)
    } catch (e) {
        
    }
    }

    async findAllEntities(): Promise<AttributeEntity[]> {
    try {
        return await this.attributeRepository.findAllEntities()
    } catch (e) {
        
    }
    }
}