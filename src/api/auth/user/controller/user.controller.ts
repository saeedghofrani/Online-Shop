import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CheckMobileOtpDto, MobileSendOtpDto } from '../dto/mobile-otp.dto';
import { CheckEmailOtpDto, EmailSendOtpDto } from '../dto/email-otp.dto';
import { UseJwtGuard } from 'common/guards/jwt.guard';
import { GetUser } from 'common/decorator/user.decorator';
import { UserInterface } from 'common/interfaces/user.interface';
import { LoginRigesterInterceptor } from 'common/interceptors/login-rigester.interceptor';
import { OtpInterceptor } from '../../../../common/interceptors/otp.interceptor';
import { Paginated } from 'nestjs-paginate';
import { PaginationQueryDto } from 'common/pagination/pagination-query.dto';
import { UserEntity } from 'entities/auth/user.entity';
import { SignInDto } from '../dto/sign-in.dto';

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
  @UseInterceptors(OtpInterceptor)
  @ApiBody({ type: MobileSendOtpDto || EmailSendOtpDto })
  sendOtp(@Body() sendOtpDto: MobileSendOtpDto | EmailSendOtpDto) {
    return this.userService.sendOtp(sendOtpDto);
  }

  @Post('check')
  @UseInterceptors(LoginRigesterInterceptor)
  @ApiOperation({ summary: 'Check Otp Message for Mobile Or Email' })
  @ApiBody({ type: CheckMobileOtpDto || CheckEmailOtpDto })
  checkOtp(@Body() sendOtpDto: CheckMobileOtpDto | CheckEmailOtpDto) {
    return this.userService.checkOtp(sendOtpDto);
  }

  @Post('signin')
  @UseInterceptors(LoginRigesterInterceptor)
  @ApiOperation({ summary: 'simple sign in' })
  @ApiBody({ type: SignInDto })
  signIn(@Body() signInDto: SignInDto) {
    return this.userService.signIn(signInDto);
  }

  @Post('signup')
  @UseInterceptors(LoginRigesterInterceptor)
  @ApiOperation({ summary: 'simple sign in' })
  @ApiBody({ type: SignInDto })
  signUp(@Body() signInDto: SignInDto) {
    return this.userService.signUp(signInDto);
  }

  @Patch('asign/role')
  @ApiOperation({ summary: 'add role to user' })
  assignRole(@Query('role') role: number, @Query('user') user: number) {
    return this.userService.assignRole(role, user);
  }

  @ApiBearerAuth('access-token')
  @Get('role')
  @ApiOperation({ summary: 'Set User Role' })
  @UseJwtGuard()
  setRole(@Query('roleId') roleId: string, @GetUser() user: UserInterface) {
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
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get User' })
  @UseJwtGuard()
  findOneEntity(@GetUser() user: UserInterface) {
    return this.userService.findOneEntity(user.userId);
  }

  @Post('page')
  @ApiOperation({ summary: 'User Pagination' })
  userPagination(
    @Body() query: PaginationQueryDto,
  ): Promise<Paginated<UserEntity>> {
    return this.userService.userPagination(query);
  }
}
