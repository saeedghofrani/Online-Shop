import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PatternMasterEntity } from 'src/entities/WALLET/pattern-master.entity';
import { UpdateResult } from 'typeorm';
import { CreatePatternMasterDto } from '../dto/create-pattern-master.dto';
import { UpdatePatternMasterDto } from '../dto/update-pattern-master.dto';
import { PatternMasterService } from '../service/pattern-master.service';

@ApiBearerAuth('access-token')
@ApiTags('Pattern-Master')
@Controller('pattern-master')
export class PatternMasterController {
  constructor(private patternMasterService: PatternMasterService) {}

  @Post()
  async createEntity(
    @Body() createEntityDto: CreatePatternMasterDto,
  ): Promise<PatternMasterEntity> {
    return this.patternMasterService.createEntity(createEntityDto);
  }

  @Get('all')
  async findAllEntities(): Promise<PatternMasterEntity[]> {
    return this.patternMasterService.findAllEntities();
  }

  @Get()
  async findOneEntity(@Query('pattern_master_id') id: string): Promise<PatternMasterEntity> {
    return this.patternMasterService.findOneEntity(id);
  }

  @Patch()
  async updateEntity(
    @Query('patternMaster_Id') id: string,
    @Body() updateEntityDto: UpdatePatternMasterDto,
  ): Promise<UpdateResult> {
    return this.patternMasterService.updateEntity(
      id,
      updateEntityDto
    );
  }
}
