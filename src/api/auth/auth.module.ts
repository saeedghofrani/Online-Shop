import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'common/strategies/jwt.strategy';
import { ConfigurationModule } from 'config/configuration.module';
import { EmailModule } from 'utils/email/email.module';
import { RedisService } from 'utils/redis/redis.service';
import { SmsService } from 'utils/sms/sms.service';
import { SmsModule } from '../../utils/sms/sms.module';
import { HistoryModule } from '../history/history.module';
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
import { RouteController } from './route/controller/route.controller';
import { RouteRepository } from './route/repositories/route.repository';
import { RouteService } from './route/service/route.service';
import { UserController } from './user/controller/user.controller';
import { UserRepository } from './user/repositories/user.repository';
import { UserService } from './user/service/user.service';

@Module({
  imports: [
    SmsModule,
    EmailModule,
    HistoryModule,
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: process.env.JWT_SECRET,
      }),
    }),
  ],
  controllers: [
    UserController,
    RouteController,
    RoleController,
    ProfileController,
    PermissionController,
    KycController,
  ],
  providers: [
    UserService,
    RedisService,
    RouteRepository,
    RouteService,
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
