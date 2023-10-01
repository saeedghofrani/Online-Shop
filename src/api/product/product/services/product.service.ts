import { Injectable } from '@nestjs/common';
import { Paginated } from 'nestjs-paginate';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { ProductEntity } from 'src/entities/PRODUCT/product.entity';
import { UpdateResult } from 'typeorm';
import { BrandService } from '../../brand/services/brand.service';
import { CategoryService } from '../../category/services/catgeory.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductRepository } from '../repositories/product.repository';

@Injectable()
export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private categoryService: CategoryService,
    private brandService: BrandService,
  ) {}

  async createEntity(
    categoryId: string,
    brandId: string,
    createEntityDto: CreateProductDto,
  ): Promise<ProductEntity> {
    try {
      createEntityDto.brand = await this.brandService.findOneEntity(brandId);
      createEntityDto.category = await this.categoryService.findOneEntity(
        categoryId,
      );
      return await this.productRepository.createEntity(createEntityDto);
    } catch (error) { throw error }
  }
  async updateEntity(
    id: string,
    updateEntityDto: UpdateProductDto,
    categoryId: string,
    brandId: string,
  ): Promise<UpdateResult> {
    try {
    } catch (error) { throw error }
    categoryId
      ? (updateEntityDto.category = await this.categoryService.findOneEntity(
          categoryId,
        ))
      : (updateEntityDto.category = null);
    brandId
      ? (updateEntityDto.brand = await this.brandService.findOneEntity(brandId))
      : (updateEntityDto.brand = null);
    return await this.productRepository.updateEntity(id, updateEntityDto);
  }
  async findOneEntity(id: string): Promise<ProductEntity> {
    try {
      return await this.productRepository.findOneEntity(id);
    } catch (error) {
      throw error;
    }
  }
  async findAllEntities(): Promise<ProductEntity[]> {
    try {
      return await this.productRepository.findAllEntities();
    } catch (error) {
      throw error;
    }
  }

  async productPagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<ProductEntity>> {
    try {
      return this.productRepository.productPagination(query);
    } catch (error) {
      throw error;
    }
  }

  async test(query: PaginationQueryDto): Promise<Paginated<ProductEntity>> {
    try {
      return this.productRepository.test(query);
    } catch (error) {
      throw error;
    }
  }

  async productList() {
    try {
      return await this.productRepository.productList();
    } catch (error) {
      throw error;
    }
  }
}
