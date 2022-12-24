import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from '../../entities/AUTH/profile.entity';
import { ProfileService } from './service/profile.service';
import { ProfileController } from './controller/profile.controller';
import { ProfileRepository } from './repositories/profile.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity])],
  controllers: [ProfileController],
  providers: [ProfileService, ProfileRepository],
  exports: [ProfileService],
})
export class ProfileModule {}
