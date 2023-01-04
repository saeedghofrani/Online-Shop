import { Injectable } from '@nestjs/common';
import { ProductAttributeEntity } from 'src/entities/PRODUCT/product-attribute.entity';
import { UpdateResult } from 'typeorm';
import { CreateProductAttribute } from '../dto/create-product-attribute.dto';
import { UpdateProductAttribute } from '../dto/update-product-attribute.dto';
import { ProductAttributeRepository } from '../repositories/product-attribute.repository';

@Injectable()
export class ProductAttributeService {
  constructor(private productAttributeRepository: ProductAttributeRepository) {}

  async createEntity(
    createEntityDto: CreateProductAttribute,
  ): Promise<ProductAttributeEntity> {
    return await this.productAttributeRepository.createEntity(createEntityDto);
  }
  async updateEntity(
    id: string,
    updateEntityDto: UpdateProductAttribute,
  ): Promise<UpdateResult> {
    return await this.productAttributeRepository.updateEntity(
      id,
      updateEntityDto,
    );
  }
  async findOneEntity(id: string): Promise<ProductAttributeEntity> {
    return await this.productAttributeRepository.findOneEntity(id);
  }
  async findAllEntities(): Promise<ProductAttributeEntity[]> {
    return await this.productAttributeRepository.findAllEntities();
  }
}
