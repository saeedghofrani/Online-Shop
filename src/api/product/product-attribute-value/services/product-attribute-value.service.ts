import { Injectable } from '@nestjs/common';
import { Paginated } from 'nestjs-paginate';
import { PaginationQueryDto } from 'common/pagination/pagination-query.dto';
import { ProductAttributeValueEntity } from 'entities/product/product-attribute-value.entity';
import { UpdateResult } from 'typeorm';
import { CreateProductAttributeValueDto } from '../dto/create-product-attribute-value.dto';
import { UpdateProductAttributeValueDto } from '../dto/update-product-attribute-value.dto';
import { ProductAttributeValueRepository } from '../repositories/product-attribute-value.repository';
import { AttributeValueService } from '../../attribute-value/services/attribute-value.service';
import { ProviderService } from 'api/inventory/provider/service/provider.service';
import { ProductService } from '../../product/services/product.service';

@Injectable()
export class ProductAttributeValueService {
  constructor(
    private ProductAttributeValueRepository: ProductAttributeValueRepository,
    private attributeValueService: AttributeValueService,
    private productService: ProductService,
    private providerService: ProviderService,
  ) {}

  async createEntity(
    createEntityDto: CreateProductAttributeValueDto,
  ): Promise<ProductAttributeValueEntity> {
    try {
      createEntityDto.provider = await this.providerService.findDefault();
      createEntityDto.attribute_value =
        await this.attributeValueService.findOneEntity(
          createEntityDto.attribute_value_id,
        );
      createEntityDto.product = await this.productService.findOneEntity(
        createEntityDto.product_id,
      );
      return await this.ProductAttributeValueRepository.createEntity(
        createEntityDto,
      );
    } catch (e) {
      throw e;
    }
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdateProductAttributeValueDto,
  ): Promise<UpdateResult> {
    try {
      updateEntityDto.provider = await this.providerService.findOneEntity(
        updateEntityDto.provider_id,
      );
      updateEntityDto.attribute_value =
        await this.attributeValueService.findOneEntity(
          updateEntityDto.attribute_value_id,
        );
      updateEntityDto.product = await this.productService.findOneEntity(
        updateEntityDto.product_id,
      );
      return await this.ProductAttributeValueRepository.updateEntity(
        id,
        updateEntityDto,
      );
    } catch (e) {
      throw e;
    }
  }

  async findOneEntity(id: string): Promise<ProductAttributeValueEntity> {
    try {
      return await this.ProductAttributeValueRepository.findOneEntity(id);
    } catch (e) {
      throw e;
    }
  }

  async findAllEntities(): Promise<ProductAttributeValueEntity[]> {
    try {
      return await this.ProductAttributeValueRepository.findAllEntities();
    } catch (e) {
      throw e;
    }
  }

  async findByProduct(id: string) {
    try {
      return await this.ProductAttributeValueRepository.findByProduct(id);
    } catch (e) {
      throw e;
    }
  }

  async removeEntity(id: string) {
    try {
      return await this.ProductAttributeValueRepository.removeEntity(id);
    } catch (e) {
      throw e;
    }
  }

  async ProductAttributeValeuPagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<ProductAttributeValueEntity>> {
    try {
      return this.ProductAttributeValueRepository.ProductAttributeValuePagination(
        query,
      );
    } catch (e) {
      throw e;
    }
  }
}
