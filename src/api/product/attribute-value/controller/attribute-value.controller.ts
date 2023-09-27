import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Paginated } from 'nestjs-paginate';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { AttributeValueEntity } from 'src/entities/PRODUCT/attribute-value.entity';
import { UpdateResult } from 'typeorm';
import { CreateAttributeValueDto } from '../dto/create-attribute-value.dto';
import { UpdateAttributeValueDto } from '../dto/update-attribute-value.dto';
import { AttributeValueService } from '../services/attribute-value.service';

@ApiBearerAuth('access-token')
@ApiTags('AttributeValue')
@Controller('attribute_attribute')
export class AttributeValueController {
  constructor(private attributeValueService: AttributeValueService) { }

  @Post()
  createEntity(@Body() createEntityDto: CreateAttributeValueDto): Promise<AttributeValueEntity> {
    return this.attributeValueService.createEntity(createEntityDto);
  }

  @Patch()
  updateEntity(
    @Query('attribute-value_id') id: string,
    @Body() updateEntityDto: UpdateAttributeValueDto,
  ): Promise<UpdateResult> {
    return this.attributeValueService.updateEntity(id, updateEntityDto);
  }

  @Get()
  findOneEntity(@Query('attribute-value_id') id: string): Promise<AttributeValueEntity> {
    return this.attributeValueService.findOneEntity(id);
  }

  @Get('all')
  findAllEntities(): Promise<AttributeValueEntity[]> {
    return this.attributeValueService.findAllEntities();
  }

  @Post('page')
  @ApiOperation({ summary: 'AttributeValue Pagination' })
  attributeValuePagination(
    @Body() query: PaginationQueryDto,
  ): Promise<Paginated<AttributeValueEntity>> {
    return this.attributeValueService.attributeValuePagination(query);
  }
}