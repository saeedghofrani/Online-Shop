import {
  Body, Controller, Get, Patch, Post, Query
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Paginated } from 'nestjs-paginate';
import { GetUser } from 'src/common/decorator/user.decorator';
import { UseJwtGuard } from 'src/common/guards/jwt.guard';
import { UserInterface } from 'src/common/interfaces/user.interface';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
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
  @UseJwtGuard()
  @ApiOperation({ summary: 'create Address' })
  async createEntity(
    @Body() createEntityDto: CreateAddressDto,
    @GetUser() user: UserInterface,
  ): Promise<AddressEntity> {
    createEntityDto.userId = user.userId;
    return await this.addressService.createEntity(createEntityDto);
  }

  @Patch()
  @ApiOperation({ summary: 'Update Address' })
  async updateEntity(
    @Query('addressId') id: string,
    @Body() updateEntityDto: UpdateAddressDto,
  ): Promise<UpdateResult> {
    return await this.addressService.updateEntity(id, updateEntityDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get One Address' })
  async findOneEntity(@Query('addressId') id: string): Promise<AddressEntity> {
    return await this.addressService.findOneEntity(id);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get All Addresses' })
  async findAllEntities(): Promise<AddressEntity[]> {
    return await this.addressService.findAllEntities();
  }

  @Post("page")
  addressPagination(@Body() query:PaginationQueryDto)
  {
    return this.addressService.addressPagination(query)
  }
}
