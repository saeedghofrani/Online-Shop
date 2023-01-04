import {Injectable} from "@nestjs/common";
import {RepositoriesAbstract} from "../../../../common/abstract/repositories.abstract";
import {OrderEntity} from "../../../../entities/WALLET/order.entity";
import {CreateOrderDto} from "../dto/create-order.dto";
import {UpdateOrderDto} from "../dto/update-order.dto";
import {UpdateResult} from "typeorm";
import {OrderRepository} from "../repositories/order.repository";
import {PricingService} from "../../pricing/services/pricing.service";
import {UserService} from "../../../auth/user/service/user.service";

@Injectable()
export class OrderService {
    constructor(private orderRepository:OrderRepository,
                private pricingService:PricingService,
                private userService:UserService) {
    }
    async createEntity(createEntityDto: CreateOrderDto,userId:string,pricingId:string): Promise<OrderEntity> {
        try {
            const findPricing=await this.pricingService.findOneEntity(pricingId)
            const findUser=await this.userService.findOneEntity(userId)
            if(!findPricing && !findUser)
                throw new Error()

            createEntityDto.user=findUser
            createEntityDto.price=findPricing

            return await this.orderRepository.createEntity(createEntityDto)
        }catch (e) {

        }
    }

    async findAllEntities(): Promise<OrderEntity[]> {
       try {
           return await this.orderRepository.findAllEntities()
       }catch (e) {

       }
    }

    async findOneEntity(id: string): Promise<OrderEntity> {
        try {
            return await this.orderRepository.findOneEntity(id)
        }catch (e) {

        }
    }

    async updateEntity(id: string, updateEntityDto: UpdateOrderDto,userId:string,pricingId:string): Promise<UpdateResult> {
       try {
           if(userId)
               updateEntityDto.user=await this.userService.findOneEntity(userId)

           if(pricingId)
               updateEntityDto.price=await this.pricingService.findOneEntity(pricingId)

           return await this.orderRepository.updateEntity(id, updateEntityDto)
       }catch (e) {

       }
    }

}