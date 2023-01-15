import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleService } from '../service/role.service';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { CreateRoleDto } from '../dto/create-role.dto';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';

@ApiBearerAuth('access-token')
@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get('all')
  @ApiOperation({ summary: 'Get All Roles' })
  findAllEntities() {
    return this.roleService.findAllEntities();
  }

  @Post('page')
  @ApiOperation({ summary: 'Role Pagination' })
  rolePaginations(@Body() query: PaginationQueryDto) {
    return this.roleService.rolePagination(query);
  }

  @Patch('')
  @ApiOperation({ summary: 'Update Role' })
  @ApiBody({ type: UpdateRoleDto })
  updateEntity(
    @Query('roleId') roleId: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.roleService.updateEntity(roleId, updateRoleDto);
  }

  @Post('')
  @ApiOperation({ summary: 'Create Role' })
  @ApiBody({ type: CreateRoleDto })
  sendOtp(@Body() createEntityDto: CreateRoleDto) {
    return this.roleService.createEntity(createEntityDto);
  }

  @Get('')
  @ApiOperation({ summary: 'Get Role By Id' })
  findOneEntity(@Query('roleId') roleId: string) {
    return this.roleService.findOneEntity(roleId);
  }
}
