import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CheckMobileOtpDto, MobileSendOtpDto } from '../dto/mobile-otp.dto';
import { CheckEmailOtpDto, EmailSendOtpDto } from '../dto/email-otp.dto';
import { UseJwtGuard } from 'src/common/guards/jwt.guard';
import { GetUser } from 'src/common/decorator/user.decorator';
import { UserInterface } from 'src/common/interfaces/user.interface';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBearerAuth('access-token')
  @UseJwtGuard()
  @Get('all')
  @ApiOperation({ summary: 'Get All Users' })
  findAllEntities() {
    return this.userService.findAllEntities();
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

  @ApiBearerAuth('access-token')
  @Get('role')
  @ApiOperation({ summary: 'Set User Role' })
  @UseJwtGuard()
  setRole(@Query('roleId') roleId: string, @GetUser() user: UserInterface) {
    console.log('user', user);
    return this.userService.setRole(user, roleId);
  }

  @Patch('')
  @ApiOperation({ summary: 'Update User' })
  @ApiBody({ type: UpdateUserDto })
  updateEntity(
    @Query('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateEntity(userId, updateUserDto);
  }

  @Get('')
  @ApiOperation({ summary: 'Get User By Id' })
  findOneEntity(@Query('userId') userId: string) {
    return this.userService.findOneEntity(userId);
  }
}
