import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionService } from './service/permission.service';
import { PermissionController } from './controller/permission.controller';
import { PermissionEntity } from '../../entities/AUTH/permission.entity';
import { PermissionRepository } from './repositories/permission.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionEntity])],
  controllers: [PermissionController],
  providers: [PermissionService, PermissionRepository],
  exports: [PermissionService],
})
export class PermissionModule {}
