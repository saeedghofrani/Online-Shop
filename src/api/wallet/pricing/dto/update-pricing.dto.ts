import {ProductEntity} from "../../../../entities/PRODUCT/product.entity";
import {ApiHideProperty, ApiProperty} from "@nestjs/swagger";

export class UpdatePricingDto {
    @ApiProperty()
    price: number;

    @ApiHideProperty()
    product: ProductEntity;
}