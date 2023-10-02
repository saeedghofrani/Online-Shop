import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { CreateWebDto } from '../dto/create-web.dto';
import { UpdateWebDto } from '../dto/update-web.dto';
import { WebService } from '../service/web.service';

@ApiBearerAuth('access-token')
@ApiTags('Web')
@Controller('web')
export class WebController {
  constructor(private webService: WebService) {}

  @Get('all')
  @ApiOperation({ summary: 'Get All Web' })
  findAllEntities() {
    return this.webService.findAllEntities();
  }

  @Get('last')
  @ApiOperation({ summary: 'Get last web record' })
  findLast() {
    return this.webService.findLast();
  }

  @Post('page')
  @ApiOperation({ summary: 'Web Pagination' })
  webPagination(@Body() query: PaginationQueryDto) {
    return this.webService.webPagination(query);
  }

  @Patch('')
  @ApiOperation({ summary: 'Update Web' })
  @ApiBody({ type: UpdateWebDto })
  updateEntity(
    @Query('summaryId') summaryId: string,
    @Body() updateWebDto: UpdateWebDto,
  ) {
    return this.webService.updateEntity(summaryId, updateWebDto);
  }

  @Post('')
  @ApiOperation({ summary: 'Create Web' })
  @ApiBody({ type: CreateWebDto })
  sendOtp(@Body() createWebDto: CreateWebDto) {
    return this.webService.createEntity(createWebDto);
  }

  @Get('')
  @ApiOperation({ summary: 'Get Web By Id' })
  findOneEntity(@Query('summaryId') summaryId: string) {
    return this.webService.findOneEntity(summaryId);
  }
}
