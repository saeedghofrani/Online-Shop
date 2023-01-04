import {Injectable} from "@nestjs/common";
import {RepositoriesAbstract} from "../../../../common/abstract/repositories.abstract";
import {PaymentEntity} from "../../../../entities/WALLET/payment.entity";
import {CreatePaymentDto} from "../dto/create-payment.dto";
import {UpdatePaymentDto} from "../dto/update-payment.dto";
import {UpdateResult} from "typeorm";
import {PaymentRepository} from "../repositories/payment.repository";
import {ProductService} from "../../../product/product/services/product.service";

@Injectable()
export class PaymentService {
    constructor(private paymentRepository:PaymentRepository,
                private productService:ProductService) {
    }
    async createEntity(createEntityDto: CreatePaymentDto,productId:string): Promise<PaymentEntity> {
       try {
           const findProduct=await this.productService.findOneEntity(productId)
           if(!findProduct)
               throw new Error()
           createEntityDto.product=findProduct
           return await this.paymentRepository.createEntity(createEntityDto)
       }catch (e) {

       }
    }

    async findAllEntities(): Promise<PaymentEntity[]> {
       try {
           return await this.paymentRepository.findAllEntities()
       }catch (e) {

       }
    }

    async findOneEntity(id: string): Promise<PaymentEntity> {
      try {
          return await this.paymentRepository.findOneEntity(id)
      }catch (e) {

      }
    }

    async updateEntity(id: string, updateEntityDto: UpdatePaymentDto): Promise<UpdateResult> {
        try {
            return await this.paymentRepository.updateEntity(id,updateEntityDto)
        }catch (e) {

        }
    }

}