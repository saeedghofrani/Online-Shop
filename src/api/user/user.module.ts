import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { SmsModule } from '../../utils/sms/sms.module';
import { EmailModule } from 'src/utils/email/email.module';
import { RedisService } from 'src/utils/redis/redis.service';
import { SmsService } from 'src/utils/sms/sms.service';
import { EmailService } from '../../utils/email/service/email.service';
import { UserController } from './controller/user.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserRepository } from './repositories/user.repository';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';
import { RoleModule } from '../role/role.module';

// const jwtFactory = {
//   useFactory: async (configService: ConfigService) => ({
//     secret: jwtConstants.secret,
//     signOptions: {
//       expiresIn: configService.get('JWT_EXP_H'),
//     },
//   }),
//   inject: [ConfigService],
// };

@Module({
  imports: [
    SmsModule,
    EmailModule,
    RoleModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: process.env.JWT_SECRET,
      }),
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    RedisService,
    SmsService,
    UserRepository,
    JwtStrategy,
    ConfigModule,
  ],
  exports: [UserService],
})
export class UserModule {}
