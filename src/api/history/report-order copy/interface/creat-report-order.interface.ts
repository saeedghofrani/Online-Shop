import { ProductEntity } from "src/entities/PRODUCT/product.entity";
import { PricingEntity } from "src/entities/WALLET/pricing.entity";

export interface CreateReportOrderInterface {
    user: string;

    pricing: PricingEntity;

    price: string;

    product: ProductEntity;
}
