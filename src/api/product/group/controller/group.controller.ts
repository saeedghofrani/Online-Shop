import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { GroupEntity } from 'src/entities/PRODUCT/group.entity';
import { UpdateResult } from 'typeorm';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { GroupService } from '../services/group.service';

@ApiBearerAuth('access-token')
@ApiTags('Group')
@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Post()
  createEntity(@Body() createEntityDto: CreateGroupDto): Promise<GroupEntity> {
    return this.groupService.createEntity(createEntityDto);
  }

  @Post("page")
  brandPagination(@Body() query:PaginationQueryDto)
  {
    return this.groupService.groupPagination(query)
  }

  @Patch()
  updateEntity(
    @Query('group_id') id: string,
    @Body() updateEntityDto: UpdateGroupDto,
  ): Promise<UpdateResult> {
    return this.groupService.updateEntity(id, updateEntityDto);
  }

  @Get()
  findOneEntity(@Query('group_id') id: string): Promise<GroupEntity> {
    return this.groupService.findOneEntity(id);
  }

  @Get('all')
  findAllEntities(): Promise<GroupEntity[]> {
    return this.groupService.findAllEntities();
  }
}
