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
import { GroupRepository } from './group/repositories/group.repository';
import { GroupService } from './group/services/group.service';

@Module({
  controllers: [AttributeController, BrandController, CategoryController],
  providers: [
    AttributeService,
    AttributeRepository,
    BrandService,
    BrandRepository,
    CategoryService,
    CategoryRepository,
    GroupService,
    GroupRepository,
  ],
})
export class ProductModule {}
