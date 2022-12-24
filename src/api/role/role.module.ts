import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from '../../entities/AUTH/role.entity';
import { RoleService } from './service/role.service';
import { RoleController } from './controller/role.controller';
import { RoleRepository } from './repositories/role.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  controllers: [RoleController],
  providers: [RoleService,RoleRepository],
  exports: [RoleService],
})
export class RoleModule {}
