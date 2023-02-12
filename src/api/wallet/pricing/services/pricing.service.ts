import { Injectable } from '@nestjs/common';
import { RepositoriesAbstract } from '../../../../common/abstract/repositories.abstract';
import { PricingEntity } from '../../../../entities/WALLET/pricing.entity';
import { CreatePricingDto } from '../dto/create-pricing.dto';
import { UpdatePricingDto } from '../dto/update-pricing.dto';
import { UpdateResult } from 'typeorm';
import { PricingRepository } from '../repositories/pricing.repository';
import { ProductService } from '../../../product/product/services/product.service';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { Paginated } from 'nestjs-paginate';

@Injectable()
export class PricingService {
  constructor(
    private pricingRepository: PricingRepository,
    private productService: ProductService,
  ) {}
  async createEntity(
    createEntityDto: CreatePricingDto,
    productId: string,
  ): Promise<PricingEntity> {
    try {
      const findProduct = await this.productService.findOneEntity(productId);
      if (findProduct) createEntityDto.product = findProduct;
      return await this.pricingRepository.createEntity(createEntityDto);
    } catch (e) {}
  }

  async findAllEntities(): Promise<PricingEntity[]> {
    try {
      return await this.pricingRepository.findAllEntities();
    } catch (e) {}
  }

  async findOneEntity(id: string): Promise<PricingEntity> {
    try {
      return await this.pricingRepository.findOneEntity(id);
    } catch (e) {}
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdatePricingDto,
    productId: string,
  ): Promise<UpdateResult> {
    try {
      const findProduct = await this.productService.findOneEntity(productId);
      if (findProduct) updateEntityDto.product = findProduct;
      return await this.pricingRepository.updateEntity(id, updateEntityDto);
    } catch (e) {}
  }

  async pricingPagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<PricingEntity>> {
    return this.pricingRepository.pricingPagination(query);
  }
}
