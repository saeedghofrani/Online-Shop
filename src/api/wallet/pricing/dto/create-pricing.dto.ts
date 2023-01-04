import {ProductEntity} from "../../../../entities/PRODUCT/product.entity";
import {ApiHideProperty, ApiProperty} from "@nestjs/swagger";

export class CreatePricingDto {
    @ApiProperty()
    price: number;

    @ApiHideProperty()
    product: ProductEntity;
}