import { ProductEntity } from 'entities/product/product.entity';

export interface CreateReportOrderInterface {
  user: string;

  pricing: any;

  price: string;

  product: ProductEntity;
}
