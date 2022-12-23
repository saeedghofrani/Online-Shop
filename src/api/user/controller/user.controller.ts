import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from '../dto/update.user.dto';
import { CheckMobileOtpDto, MobileSendOtpDto } from '../dto/mobile-otp.dto';
import { CheckEmailOtpDto, EmailSendOtpDto } from '../dto/email-otp.dto';
import { LocalAuthGuard } from '../../../common/guards/local-auth.guard';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@ApiBearerAuth('access-token')
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('all')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get All Users' })
  findAllEntities() {
    return this.userService.findAllEntities();
  }

  @Patch('')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update User' })
  @ApiBody({ type: UpdateUserDto })
  updateEntity(
    @Query('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateEntity(userId, updateUserDto);
  }

  @Post('send')
  @ApiOperation({ summary: 'Send Otp Message To Mobile Or Email' })
  @ApiBody({ type: MobileSendOtpDto || EmailSendOtpDto })
  sendOtp(@Body() sendOtpDto: MobileSendOtpDto | EmailSendOtpDto) {
    return this.userService.sendOtp(sendOtpDto);
  }

  @Post('check')
  @ApiOperation({ summary: 'Check Otp Message for Mobile Or Email' })
  @ApiBody({ type: CheckMobileOtpDto || CheckEmailOtpDto })
  checkOtp(@Body() sendOtpDto: CheckMobileOtpDto | CheckEmailOtpDto) {
    return this.userService.checkOtp(sendOtpDto);
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get User By Id' })
  findOneEntity(@Query('userId') userId: string) {
    return this.userService.findOneEntity(userId);
  }
}
