import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PermissionService } from '../service/permission.service';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { PaginationQueryDto } from 'common/pagination/pagination-query.dto';

@ApiBearerAuth('access-token')
@ApiTags('Permission')
@Controller('permission')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Get('all')
  @ApiOperation({ summary: 'Get All Permissions' })
  findAllEntities() {
    return this.permissionService.findAllEntities();
  }

  @Post('page')
  @ApiOperation({ summary: 'Permission Pagination' })
  testPaginations(@Body() query: PaginationQueryDto) {
    return this.permissionService.permissionPagination(query);
  }

  @Patch('')
  @ApiOperation({ summary: 'Update Permission' })
  @ApiBody({ type: UpdatePermissionDto })
  updateEntity(
    @Query('permissionId') permissionId: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionService.updateEntity(
      permissionId,
      updatePermissionDto,
    );
  }

  @Post('')
  @ApiOperation({ summary: 'Create Permission' })
  @ApiBody({ type: CreatePermissionDto })
  sendOtp(@Body() createEntityDto: CreatePermissionDto) {
    return this.permissionService.createEntity(createEntityDto);
  }

  @Get('')
  @ApiOperation({ summary: 'Get Permission By Id' })
  findOneEntity(@Query('permissionId') permissionId: string) {
    return this.permissionService.findOneEntity(permissionId);
  }
}
