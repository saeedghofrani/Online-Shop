import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FunctionsClass } from 'src/common/classes/functions.class';
import { PayloadJwtInterface } from 'src/common/interfaces/payload-jwt.interface';
import { UserEntity } from 'src/entities/AUTH/user.entity';
import { SendEmailDto } from 'src/utils/email/dto/send-email.dto';
import { EmailService } from 'src/utils/email/service/email.service';
import { RedisService } from 'src/utils/redis/redis.service';
import { SmsService } from 'src/utils/sms/sms.service';
import { UpdateResult } from 'typeorm';
import { RoleService } from '../../role/service/role.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { EmailSendOtpDto, CheckEmailOtpDto } from '../dto/email-otp.dto';
import { MobileSendOtpDto, CheckMobileOtpDto } from '../dto/mobile-otp.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { OtpRedisInterface } from '../interface/otp-redis.interface';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private redisService: RedisService,
    private smsService: SmsService,
    private emailService: EmailService,
    private jwtService: JwtService,
    private roleService: RoleService,
  ) {}

  private async createEntity(
    createEntityDto: CreateUserDto,
  ): Promise<UserEntity> {
    return await this.userRepository.createEntity(createEntityDto);
  }

  async findAllEntities(): Promise<UserEntity[]> {
    return await this.userRepository.findAllEntities();
  }

  async findByEntity(searchTerm: string): Promise<UserEntity> {
    return await this.userRepository.findByEntity(searchTerm);
  }

  async findOneEntity(userId: string): Promise<UserEntity> {
    return await this.userRepository.findOneEntity(userId);
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.userRepository.updateEntity(id, updateEntityDto);
  }

  async sendOtp(
    sendOtpDto: MobileSendOtpDto | EmailSendOtpDto,
  ): Promise<{ hashCode: string }> {
    const hashCode = FunctionsClass.generateRandomString(12);
    const otpCode = FunctionsClass.generateRandomOtpCode(6);
    if (sendOtpDto.hasOwnProperty('mobile')) {
      await this.sendOtpMobile(<MobileSendOtpDto>sendOtpDto, otpCode, hashCode);
    } else {
      await this.sendOtpEmail(<EmailSendOtpDto>sendOtpDto, otpCode, hashCode);
    }
    return { hashCode };
  }

  private async sendOtpMobile(
    sendOtpDto: MobileSendOtpDto,
    otpCode: string,
    hashCode: string,
  ): Promise<void> {
    await this.smsService.sendOtp(otpCode, sendOtpDto.mobile);
    await this.redisService.setKey(
      `${hashCode}`,
      JSON.stringify({
        otpCode,
        user: sendOtpDto.mobile,
      }),
      120,
    );
  }

  private async sendOtpEmail(
    sendOtpDto: EmailSendOtpDto,
    otpCode: string,
    hashCode: string,
  ): Promise<void> {
    const sendEmailDto: SendEmailDto = {
      otp: otpCode,
      subject: 'test',
    };
    await this.emailService.sentCode(sendOtpDto.email, sendEmailDto);
    await this.redisService.setKey(
      `${hashCode}`,
      JSON.stringify({
        otpCode,
        user: sendOtpDto.email,
      }),
      120,
    );
  }

  async checkOtp(
    checkOtpDto: CheckMobileOtpDto | CheckEmailOtpDto,
  ): Promise<{ access_token: string }> {
    let userEntity: UserEntity;
    const getKey: OtpRedisInterface = JSON.parse(
      await this.redisService.getKey(`${checkOtpDto.hash}`),
    );
    if (!getKey) throw new BadRequestException('Code has expired ...! ');
    if (getKey.otpCode !== checkOtpDto.code)
      throw new BadRequestException('Otp Code is not valid ...!');
    userEntity = await this.findByEntity(getKey.user);
    if (!userEntity) {
      const role = await this.roleService.getRoleDefault();
      const createUser = new CreateUserDto();
      if (checkOtpDto.hasOwnProperty('mobile')) createUser.mobile = getKey.user;
      else createUser.email = getKey.user;
      createUser.roles = [role];
      userEntity = await this.createEntity(createUser);
    }
    const payload: PayloadJwtInterface = {
      userId: userEntity.id,
      user: userEntity.mobile || userEntity.email,
    };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '12h' }),
    };
  }
}
