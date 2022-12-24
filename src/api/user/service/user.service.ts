import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../../../entities/AUTH/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { RedisService } from '../../../utils/redis/redis.service';
import { SendOtpStatusEnum } from '../enum/send-otp-status.enum';
import { FunctionsClass } from '../../../common/classes/functions.class';
import { CheckMobileOtpDto, MobileSendOtpDto } from '../dto/mobile-otp.dto';
import { CheckEmailOtpDto, EmailSendOtpDto } from '../dto/email-otp.dto';
import { SmsService } from '../../../utils/sms/sms.service';
import { EmailService } from 'src/utils/email/email.service';
import { OtpRedisInterface } from '../interface/otp-redis.interface';
import { v4 as uuidv4 } from 'uuid';
import { PayloadJwtInterface } from '../../../common/interfaces/payload-jwt.interface';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private redisService: RedisService,
    private smsService: SmsService,
    private emailService: EmailService,
    private jwtService: JwtService,
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
    if (sendOtpDto.otp_type == SendOtpStatusEnum.LOGIN) {
      const userEntity = await this.findByEntity(sendOtpDto.mobile);
      if (!userEntity)
        throw new BadRequestException('Your not register yet ...!');
    }
    await this.redisService.setKey(
      `${hashCode}`,
      JSON.stringify({
        otpCode,
        user: sendOtpDto.mobile,
        type: sendOtpDto.otp_type,
      }),
      120,
    );
  }

  private async sendOtpEmail(
    sendOtpDto: EmailSendOtpDto,
    otpCode: string,
    hashCode: string,
  ): Promise<void> {
    await this.emailService.sentCode(sendOtpDto.email, otpCode);
    if (sendOtpDto.otp_type == SendOtpStatusEnum.LOGIN) {
      const userEntity = await this.findByEntity(sendOtpDto.email);
      if (!userEntity)
        throw new BadRequestException('Your not register yet ...!');
    }
    await this.redisService.setKey(
      `${hashCode}`,
      JSON.stringify({
        otpCode,
        user: sendOtpDto.email,
        type: sendOtpDto.otp_type,
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
    if (getKey.type == SendOtpStatusEnum.LOGIN) {
      userEntity = await this.findByEntity(getKey.user);
      if (!userEntity)
        throw new BadRequestException('Your not register yet ...!');
    } else {
      const createUser = new CreateUserDto();
      createUser.id = uuidv4();
      if (checkOtpDto.hasOwnProperty('mobile')) createUser.mobile = getKey.user;
      else createUser.email = getKey.user;
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
