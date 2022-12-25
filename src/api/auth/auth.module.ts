import { Module } from '@nestjs/common';
import { SmsModule } from '../../utils/sms/sms.module';
import { EmailModule } from 'src/utils/email/email.module';
import { RedisService } from 'src/utils/redis/redis.service';
import { SmsService } from 'src/utils/sms/sms.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';
import { UserController } from './user/controller/user.controller';
import { UserService } from './user/service/user.service';
import { UserRepository } from './user/repositories/user.repository';
import { KycController } from './kyc/controller/kyc.controller';
import { KycRepository } from './kyc/repositories/kyc.repository';
import { KycService } from './kyc/service/kyc.service';
import { PermissionController } from './permission/controller/permission.controller';
import { PermissionRepository } from './permission/repositories/permission.repository';
import { PermissionService } from './permission/service/permission.service';
import { ProfileController } from './profile/controller/profile.controller';
import { ProfileRepository } from './profile/repositories/profile.repository';
import { ProfileService } from './profile/service/profile.service';
import { RoleController } from './role/controller/role.controller';
import { RoleRepository } from './role/repositories/role.repository';
import { RoleService } from './role/service/role.service';

@Module({
  imports: [
    SmsModule,
    EmailModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: process.env.JWT_SECRET,
      }),
    }),
  ],
  controllers: [
    UserController,
    RoleController,
    ProfileController,
    PermissionController,
    KycController,
  ],
  providers: [
    UserService,
    RedisService,
    ProfileService,
    ProfileRepository,
    PermissionService,
    PermissionRepository,
    KycService,
    KycRepository,
    RoleService,
    RoleRepository,
    SmsService,
    UserRepository,
    JwtStrategy,
  ],
  exports: [
    UserService,
    RoleService,
    ProfileService,
    PermissionService,
    KycService,
  ],
})
export class AuthModule {}
