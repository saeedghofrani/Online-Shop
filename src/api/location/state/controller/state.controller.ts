import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from 'common/pagination/pagination-query.dto';
import { CreateStateDto } from '../dto/create-state.dto';
import { UpdateStateDto } from '../dto/update-state.dto';
import { StateService } from '../services/state.service';

@ApiBearerAuth('access-token')
@ApiTags('State')
@Controller('state')
export class StateController {
  constructor(private stateService: StateService) {}

  @Get('all')
  @ApiOperation({ summary: 'Get All States' })
  findAllEntities() {
    return this.stateService.findAllEntities();
  }

  @Patch('')
  @ApiOperation({ summary: 'Update State' })
  @ApiBody({ type: UpdateStateDto })
  updateEntity(
    @Query('stateId') stateId: string,
    @Body() updateStateDto: UpdateStateDto,
  ) {
    return this.stateService.updateEntity(stateId, updateStateDto);
  }

  @Post('')
  @ApiOperation({ summary: 'Create State' })
  @ApiBody({ type: CreateStateDto })
  sendOtp(@Body() createEntityDto: CreateStateDto) {
    return this.stateService.createEntity(createEntityDto);
  }

  @Get('')
  @ApiOperation({ summary: 'Get State By Id' })
  findOneEntity(@Query('stateId') stateId: string) {
    return this.stateService.findOneEntity(stateId);
  }

  @Post('page')
  @ApiOperation({ summary: 'State Pagination' })
  statePagination(@Body() query: PaginationQueryDto) {
    return this.stateService.statePagination(query);
  }
}
