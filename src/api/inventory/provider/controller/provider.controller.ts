import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorator/user.decorator';
import { UserDto } from 'src/common/interfaces/user.interface';
import { CreateProviderDto } from '../dto/create-provider.dto';
import { UpdateProviderStatusDto } from '../dto/update-provider-status.dto';
import { UpdateProviderDto } from '../dto/update-provider.dto';
import { ProviderService } from '../service/provider.service';

@ApiBearerAuth('access-token')
@ApiTags('Provider')
@Controller('provider')
export class ProviderController {
  constructor(private providerService: ProviderService) {}

  @Get('all')
  @ApiOperation({ summary: 'Get All Providers' })
  findAllEntities() {
    return this.providerService.findAllEntities();
  }

  @Patch('')
  @ApiOperation({ summary: 'Update Provider' })
  @ApiBody({ type: UpdateProviderDto })
  updateEntity(
    @Query('providerId') providerId: string,
    @Body() updateProviderDto: UpdateProviderDto,
  ) {
    return this.providerService.updateEntity(
        providerId,
        updateProviderDto,
    );
  }

  @Patch('status')
  @ApiOperation({ summary: 'Update Provider status' })
  @ApiBody({ type:  UpdateProviderStatusDto})
  UpdateProviderStatus(
    @Query('providerId') providerId: string,
    @Body() updateProviderStatusDto: UpdateProviderStatusDto,
  ) {
    return this.providerService.UpdateProviderStatus(
        providerId,
        updateProviderStatusDto,
    );
  }

  @Post('')
  @ApiOperation({ summary: 'Create Provider' })
  @ApiBody({ type: CreateProviderDto })
  sendOtp(
    @Body() createEntityDto: CreateProviderDto,
    @GetUser() user: UserDto
    ) {
    return this.providerService.createEntity(createEntityDto, user.userId);
  }

  @Get('')
  @ApiOperation({ summary: 'Get Provider By Id' })
  findOneEntity(@Query('providerId') providerId: string) {
    return this.providerService.findOneEntity(providerId);
  }
}
