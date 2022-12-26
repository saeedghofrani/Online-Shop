import { Injectable } from "@nestjs/common";
import { UserService } from "src/api/auth/user/service/user.service";
import { AddressEntity } from "src/entities/LOCATION/address.entity";
import { UpdateResult } from "typeorm";
import { CityService } from "../../city/services/city.service";
import { CreateAddressDto } from "../dto/create-address.dto";
import { UpdateAddressDto } from "../dto/update-address.dto";
import { AddressRepository } from "../repositories/address.repository";

@Injectable()
export class AddressService{
    constructor(private addressRepository:AddressRepository,
        private userService:UserService,
        private cityService:CityService){}

    async createEntity(createEntityDto: CreateAddressDto): Promise<AddressEntity> {
        if(createEntityDto.userId)
        createEntityDto.user=await this.userService.findOneEntity(createEntityDto.userId)

        if(createEntityDto.cityId)
        createEntityDto.city=await this.cityService.findOneEntity(createEntityDto.cityId)

        return await this.addressRepository.createEntity(createEntityDto)
    }

    async updateEntity(id: string, updateEntityDto: UpdateAddressDto): Promise<UpdateResult> {
        if(updateEntityDto.userId)
        updateEntityDto.user=await this.userService.findOneEntity(updateEntityDto.userId)

        if(updateEntityDto.cityId)
        updateEntityDto.city=await this.cityService.findOneEntity(updateEntityDto.cityId)

        return await this.addressRepository.updateEntity(id,updateEntityDto)
    }

    async findOneEntity(id: string): Promise<AddressEntity> {
        return await this.addressRepository.findOneEntity(id)
    }

    async findAllEntities(): Promise<AddressEntity[]> {
        return await this.addressRepository.findAllEntities()
    }
}