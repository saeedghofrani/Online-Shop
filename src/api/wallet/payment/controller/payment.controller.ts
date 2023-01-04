import {CreatePaymentDto} from "../dto/create-payment.dto";
import {PaymentEntity} from "../../../../entities/WALLET/payment.entity";
import {UpdatePaymentDto} from "../dto/update-payment.dto";
import {UpdateResult} from "typeorm";
import {PaymentService} from "../services/payment.service";
import {Body, Controller, Get, Patch, Post, Query} from "@nestjs/common";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@ApiBearerAuth('access-token')
@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
    constructor(private paymentService:PaymentService) {
    }

    @Post()
    async createEntity(@Body() createEntityDto: CreatePaymentDto,@Query("product_id") productId:string): Promise<PaymentEntity> {
        return this.paymentService.createEntity(createEntityDto, productId)
    }

    @Get("all")
    async findAllEntities(): Promise<PaymentEntity[]> {
        return this.paymentService.findAllEntities()
    }

    @Get()
    async findOneEntity(@Query("payment_id") id: string): Promise<PaymentEntity> {
            return this.paymentService.findOneEntity(id)
    }

    @Patch()
    async updateEntity(@Query("payment_id") id: string,@Body() updateEntityDto: UpdatePaymentDto): Promise<UpdateResult> {
        return this.paymentService.updateEntity(id, updateEntityDto)
    }
}