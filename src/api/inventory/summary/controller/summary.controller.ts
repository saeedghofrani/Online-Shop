import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Paginated } from 'nestjs-paginate';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { CreateSummaryDto } from '../dto/create-summary.dto';
import { UpdateSummaryDto } from '../dto/update-summary.dto';
import { SummaryService } from '../service/summary.service';

@ApiBearerAuth('access-token')
@ApiTags('Summary')
@Controller('summary')
export class SummaryController {
  constructor(private summaryService: SummaryService) {}

  @Get('all')
  @ApiOperation({ summary: 'Get All Summary' })
  findAllEntities() {
    return this.summaryService.findAllEntities();
  }

  @Post("page")
  @ApiOperation({ summary: 'Summary Pagination' })
  summaryPagination(@Body() query:PaginationQueryDto)
  {
    return this.summaryService.summaryPagination(query)
  }

  @Patch('')
  @ApiOperation({ summary: 'Update Summary' })
  @ApiBody({ type: UpdateSummaryDto })
  updateEntity(
    @Query('summaryId') summaryId: string,
    @Body() updateSummaryDto: UpdateSummaryDto,
  ) {
    return this.summaryService.updateEntity(summaryId, updateSummaryDto);
  }

  @Post('')
  @ApiOperation({ summary: 'Create Summary' })
  @ApiBody({ type: CreateSummaryDto })
  sendOtp(
    @Body() createSummaryDto: CreateSummaryDto,
    @Query('providerId') providerId: string,
    @Query('productId') productId: string,
  ) {
    return this.summaryService.createEntity(
      createSummaryDto,
      productId,
      providerId,
    );
  }

  @Get('')
  @ApiOperation({ summary: 'Get Summary By Id' })
  findOneEntity(@Query('summaryId') summaryId: string) {
    return this.summaryService.findOneEntity(summaryId);
  }
}
