import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { KycService } from '../service/kyc.service';
import { CreateKycDto } from '../dto/create.kyc.dto';

@ApiBearerAuth('access-token')
@ApiTags('Kyc')
@Controller('kyc')
export class KycController {
  constructor(private kycService: KycService) {}

  @Get('all')
  @ApiOperation({ summary: 'Get All Kyc' })
  findAllEntities() {
    return this.kycService.findAllEntities();
  }

  @Post('')
  @ApiOperation({ summary: 'Create Kyc' })
  @ApiBody({ type: CreateKycDto })
  sendOtp(@Body() createEntityDto: CreateKycDto) {
    return this.kycService.createEntity(createEntityDto);
  }

  @Get('')
  @ApiOperation({ summary: 'Get Kyc By Id' })
  findOneEntity(@Query('kycId') kycId: string) {
    return this.kycService.findOneEntity(kycId);
  }
}
