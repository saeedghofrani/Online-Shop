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
import { GroupController } from './group/controller/group.controller';
import { GroupRepository } from './group/repositories/group.repository';
import { GroupService } from './group/services/group.service';
import { ProductAttributeController } from './product-attribute/controllers/product-attribute.controller';
import { ProductAttributeRepository } from './product-attribute/repositories/product-attribute.repository';
import { ProductAttributeService } from './product-attribute/services/product-attribute.service';
import { ProductController } from './product/controllers/product.controller';
import { ProductRepository } from './product/repositories/product.repository';
import { ProductService } from './product/services/product.service';

@Module({
  controllers: [
    AttributeController,
    BrandController,
    CategoryController,
    GroupController,
    ProductController,
    ProductAttributeController,
  ],
  providers: [
    AttributeService,
    AttributeRepository,
    BrandService,
    BrandRepository,
    CategoryService,
    CategoryRepository,
    GroupService,
    GroupRepository,
    ProductService,
    ProductRepository,
    ProductAttributeService,
    ProductAttributeRepository,
  ],
  exports: [
    ProductService,
    ProductRepository,
  ]
})
export class ProductModule {}
