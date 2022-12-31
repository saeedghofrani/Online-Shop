import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CityEntity } from 'src/entities/LOCATION/city.entity';
import { UpdateResult } from 'typeorm';
import { CreateCityDto } from '../dto/create-city.dto';
import { UpdateCityDto } from '../dto/update-city.dto';
import { CityService } from '../services/city.service';

@ApiBearerAuth('access-token')
@ApiTags('City')
@Controller('city')
export class CityController {
  constructor(private cityService: CityService) {}

  @Post()
  @ApiOperation({ summary: 'create city' })
  async createEntity(
    @Body() createEntityDto: CreateCityDto,
  ): Promise<CityEntity> {
    return await this.cityService.createEntity(createEntityDto);
  }

  @Patch()
  @ApiOperation({ summary: 'Update City' })
  async updateEntity(
    @Query('cityId') id: string,
    @Body() updateEntityDto: UpdateCityDto,
  ): Promise<UpdateResult> {
    return await this.cityService.updateEntity(id, updateEntityDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get One City' })
  async findOneEntity(@Query('cityId') id: string): Promise<CityEntity> {
    return await this.cityService.findOneEntity(id);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get All Cities' })
  async findAllEntities(): Promise<CityEntity[]> {
    return await this.cityService.findAllEntities();
  }
}
