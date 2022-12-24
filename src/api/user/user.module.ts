import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { RedisModule } from 'src/utils/redis/redis.module';
import { SmsModule } from '../../utils/sms/sms.module';
import { EmailModule } from 'src/utils/email/email.module';
import { RedisService } from 'src/utils/redis/redis.service';
import { SmsService } from 'src/utils/sms/sms.service';
import { EmailService } from '../../utils/email/email.service';
import { UserController } from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/AUTH/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../common/constants/jwt.constant';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserRepository } from './repositories/user.repository';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';

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
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('jwt.secret'),
      }),
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    RedisService,
    SmsService,
    EmailService,
    UserRepository,
    JwtStrategy,
    ConfigModule,
  ],
  exports: [UserService],
})
export class UserModule {}
