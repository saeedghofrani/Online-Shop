import { Module } from '@nestjs/common';
import { AttributeController } from './attribute/controllers/attribute.controller';
import { AttributeRepository } from './attribute/repositories/attribute.repository';
import { AttributeService } from './attribute/services/attribute.service';
import { BrandController } from './brand/controller/brand.controller';
import { BrandRepository } from './brand/repositories/brand.repository';
import { BrandService } from './brand/services/brand.service';
import { CategoryController } from './category/controllers/category.controller';
import { CategoryRepository } from './category/repositories/category.repository';
import { CategoryService } from './category/services/catgeory.service';
import { ProductController } from './product/controllers/product.controller';
import { ProductRepository } from './product/repositories/product.repository';
import { ProductService } from './product/services/product.service';
import { AttributeValueController } from './attribute-value/controller/attribute-value.controller';
import { AttributeValueService } from './attribute-value/services/attribute-value.service';
import { AttributeValueRepository } from './attribute-value/repositories/attribute-value.repository';
import { CategoryAttributeController } from './category-attribute/controller/category-attribute.controller';
import { CategoryAttributeService } from './category-attribute/services/category-attribute.service';
import { CategoryAttributeRepository } from './category-attribute/repositories/category-attribute.repository';
import { ProductAttributeValueController } from './product-attribute-value/controller/product-attribute-value.controller';
import { ProductAttributeValueService } from './product-attribute-value/services/product-attribute-value.service';
import { ProductAttributeValueRepository } from './product-attribute-value/repositories/product-attribute-value.repository';
import { InventoryModuel } from '../inventory/inventory.module';

@Module({
  imports: [InventoryModuel],
  controllers: [
    AttributeController,
    BrandController,
    CategoryController,
    ProductController,
    AttributeValueController,
    CategoryAttributeController,
    ProductAttributeValueController
  ],
  providers: [
    AttributeService,
    AttributeRepository,
    BrandService,
    BrandRepository,
    CategoryService,
    CategoryRepository,
    ProductService,
    ProductRepository,
    AttributeValueService,
    AttributeValueRepository,
    CategoryAttributeService,
    CategoryAttributeRepository,
    ProductAttributeValueService,
    ProductAttributeValueRepository
  ],
  exports: [
    ProductService, 
    ProductRepository
  ],
})
export class ProductModule {}
