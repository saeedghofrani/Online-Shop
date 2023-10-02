import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { PatternDetailEntity } from 'src/entities/wallet/pattern-detail.entity';
import { UpdateResult } from 'typeorm';
import { CreatePatternDetailDto } from '../dto/create-pattern-detail.dto';
import { UpdatePatternDetailDto } from '../dto/update-pattern-detail.dto';
import { PatternDetailService } from '../service/pattern-detail.service';

@ApiBearerAuth('access-token')
@ApiTags('Pattern-Detail')
@Controller('pattern-detail')
export class PatternDetailController {
  constructor(private patternDetailService: PatternDetailService) {}

  @Post()
  async createEntity(
    @Body() createEntityDto: CreatePatternDetailDto,
    @Query('pattern_master_id') pattern_master_id: string,
  ): Promise<PatternDetailEntity> {
    return this.patternDetailService.createEntity(
      createEntityDto,
      pattern_master_id,
    );
  }

  @Get('all')
  async findAllEntities(): Promise<PatternDetailEntity[]> {
    return this.patternDetailService.findAllEntities();
  }

  @Get()
  async findOneEntity(
    @Query('pattern_detail_id') id: string,
  ): Promise<PatternDetailEntity> {
    return this.patternDetailService.findOneEntity(id);
  }

  @Patch()
  async updateEntity(
    @Query('patternDetail_Id') id: string,
    @Body() updateEntityDto: UpdatePatternDetailDto,
  ): Promise<UpdateResult> {
    return this.patternDetailService.updateEntity(id, updateEntityDto);
  }

  @Post('page')
  @ApiOperation({ summary: 'Pattern Detail Pagination' })
  accountPagination(@Body() query: PaginationQueryDto) {
    return this.patternDetailService.patternDetailPagination(query);
  }
}
