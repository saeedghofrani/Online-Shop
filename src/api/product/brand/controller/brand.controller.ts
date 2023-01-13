import { Controller, Post, Body, Patch, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginateQuery, Paginated, Paginate } from 'nestjs-paginate';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { BrandEntity } from 'src/entities/PRODUCT/brand.entity';
import { UpdateResult } from 'typeorm';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';
import { BrandService } from '../services/brand.service';

@ApiBearerAuth('access-token')
@ApiTags('Brand')
@Controller('brand')
export class BrandController {
  constructor(private brandService: BrandService) {}

  @Post()
  createEntity(@Body() createEntityDto: CreateBrandDto): Promise<BrandEntity> {
    return this.brandService.createEntity(createEntityDto);
  }

  @Patch()
  updateEntity(
    @Query('brand_id') id: string,
    @Body() updateEntityDto: UpdateBrandDto,
  ): Promise<UpdateResult> {
    return this.brandService.updateEntity(id, updateEntityDto);
  }

  @Get()
  findOneEntity(@Query('brand_id') id: string): Promise<BrandEntity> {
    return this.brandService.findOneEntity(id);
  }

  @Get('all')
  findAllEntities(): Promise<BrandEntity[]> {
    return this.brandService.findAllEntities();
  }

  @Post("page")
  brandPagination(@Body() query:PaginationQueryDto):Promise<Paginated<BrandEntity>>
  {
    return this.brandService.brandPagination(query)
  }
}
