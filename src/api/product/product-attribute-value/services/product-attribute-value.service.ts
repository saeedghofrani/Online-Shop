import { Injectable } from '@nestjs/common';
import { Paginated } from 'nestjs-paginate';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { ProductAttributeValueEntity } from 'src/entities/PRODUCT/product-attribute-value.entity';
import { UpdateResult } from 'typeorm';
import { CreateProductAttributeValueDto } from '../dto/create-product-attribute-value.dto';
import { UpdateProductAttributeValueDto } from '../dto/update-product-attribute-value.dto';
import { ProductAttributeValueRepository } from '../repositories/product-attribute-value.repository';
import { AttributeValueService } from '../../attribute-value/services/attribute-value.service';
import { ProviderService } from 'src/api/inventory/provider/service/provider.service';

@Injectable()
export class ProductAttributeValueService {
  constructor(
    private categoryProductAttributeRepository: ProductAttributeValueRepository,
    private attributeValueService: AttributeValueService,
    private providerService: ProviderService
    ) {}

  async createEntity(createEntityDto: CreateProductAttributeValueDto): Promise<ProductAttributeValueEntity> {
    try {
      createEntityDto.provider = await this.providerService.findOneEntity(createEntityDto.provider_id);
      createEntityDto.attribute_value = await this.attributeValueService.findOneEntity(createEntityDto.attribute_value_id);
      return await this.categoryProductAttributeRepository.createEntity(createEntityDto);
    } catch (e) {}
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdateProductAttributeValueDto,
  ): Promise<UpdateResult> {
    try {
      updateEntityDto.provider = await this.providerService.findOneEntity(updateEntityDto.provider_id);
      updateEntityDto.attribute_value = await this.attributeValueService.findOneEntity(updateEntityDto.attribute_value_id);
      return await this.categoryProductAttributeRepository.updateEntity(id, updateEntityDto);
    } catch (e) {}
  }

  async findOneEntity(id: string): Promise<ProductAttributeValueEntity> {
    try {
      return await this.categoryProductAttributeRepository.findOneEntity(id);
    } catch (e) {}
  }

  async findAllEntities(): Promise<ProductAttributeValueEntity[]> {
    try {
      return await this.categoryProductAttributeRepository.findAllEntities();
    } catch (e) {}
  }

  async categoryProductAttributePagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<ProductAttributeValueEntity>> {
    return this.categoryProductAttributeRepository.categoryProductAttributePagination(query);
  }
}
