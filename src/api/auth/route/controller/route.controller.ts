import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateRouteDto } from '../dto/create-route.dto';
import { UpdateRouteDto } from '../dto/update-route.dto';
import { RouteService } from '../service/route.service';

@ApiBearerAuth('access-token')
@ApiTags('Route')
@Controller('route')
export class RouteController {
  constructor(private routeService: RouteService) {}

  @Get('all')
  @ApiOperation({ summary: 'Get All Routes' })
  findAllEntities() {
    return this.routeService.findAllEntities();
  }

  @Patch('')
  @ApiOperation({ summary: 'Update Route' })
  @ApiBody({ type: UpdateRouteDto })
  updateEntity(
    @Query('routeId') routeId: string,
    @Body() updateRouteDto: UpdateRouteDto,
  ) {
    return this.routeService.updateEntity(routeId, updateRouteDto);
  }

  @Post('')
  @ApiOperation({ summary: 'Create Route' })
  @ApiBody({ type: CreateRouteDto })
  sendOtp(@Body() createEntityDto: CreateRouteDto) {
    return this.routeService.createEntity(createEntityDto);
  }

  @Get('')
  @ApiOperation({ summary: 'Get Route By Id' })
  findOneEntity(@Query('routeId') routeId: string) {
    return this.routeService.findOneEntity(routeId);
  }
}
