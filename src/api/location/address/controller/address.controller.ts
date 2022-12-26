import { Controller, Post, Patch, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AddressEntity } from 'src/entities/LOCATION/address.entity';
import { UpdateResult } from 'typeorm';
import { CreateAddressDto } from '../dto/create-address.dto';
import { UpdateAddressDto } from '../dto/update-address.dto';
import { AddressService } from '../services/address.service';

@ApiBearerAuth('access-token')
@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Post()
  @ApiOperation({ summary: 'create Address' })
  async createEntity(
    createEntityDto: CreateAddressDto,
  ): Promise<AddressEntity> {
    return await this.addressService.createEntity(createEntityDto);
  }

  @Patch()
  @ApiOperation({ summary: 'Update Address' })
  async updateEntity(
    id: string,
    updateEntityDto: UpdateAddressDto,
  ): Promise<UpdateResult> {
    return await this.addressService.updateEntity(id, updateEntityDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get One Address' })
  async findOneEntity(id: string): Promise<AddressEntity> {
    return await this.addressService.findOneEntity(id);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get All Addresses' })
  async findAllEntities(): Promise<AddressEntity[]> {
    return await this.addressService.findAllEntities();
  }
}
