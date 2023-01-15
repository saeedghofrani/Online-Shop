import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProfileService } from '../service/profile.service';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { Paginated } from 'nestjs-paginate';
import { ProfileEntity } from 'src/entities/AUTH/profile.entity';

@ApiBearerAuth('access-token')
@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('all')
  @ApiOperation({ summary: 'Get All profiles' })
  findAllEntities() {
    return this.profileService.findAllEntities();
  }

  @Post('page')
  @ApiOperation({ summary: 'Profile Pagination' })
  testPaginations(
    @Body() query: PaginationQueryDto,
  ): Promise<Paginated<ProfileEntity>> {
    return this.profileService.profilePagination(query);
  }

  @Patch('')
  @ApiOperation({ summary: 'Update Profile' })
  @ApiBody({ type: UpdateProfileDto })
  updateEntity(
    @Query('profileId') profileId: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profileService.updateEntity(profileId, updateProfileDto);
  }

  @Post('')
  @ApiOperation({ summary: 'Create Profile' })
  @ApiBody({ type: CreateProfileDto })
  sendOtp(@Body() createEntityDto: CreateProfileDto) {
    return this.profileService.createEntity(createEntityDto);
  }

  @Get('')
  @ApiOperation({ summary: 'Get Profile By Id' })
  findOneEntity(@Query('profileId') profileId: string) {
    return this.profileService.findOneEntity(profileId);
  }
}
