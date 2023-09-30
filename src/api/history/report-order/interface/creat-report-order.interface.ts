import { ProductEntity } from 'src/entities/PRODUCT/product.entity';

export interface CreateReportOrderInterface {
  user: string;

  pricing: any;

  price: string;

  product: ProductEntity;
}
