import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/api/auth/user/service/user.service';
import { ProviderEntity } from 'src/entities/INVENTORY/provider.entity';
import { UpdateResult } from 'typeorm';
import { CreateProviderDto } from '../dto/create-provider.dto';
import { UpdateProviderStatusDto } from '../dto/update-provider-status.dto';
import { UpdateProviderDto } from '../dto/update-provider.dto';
import { ProviderRepository } from '../repository/provider.repository';

@Injectable()
export class ProviderService {
  constructor(
    private providerRepository: ProviderRepository,
    private userService: UserService,
  ) {}

  async createEntity(
    createEntityDto: CreateProviderDto,
    userId: string,
  ): Promise<ProviderEntity> {
    const userEntity = await this.userService.findOneEntity(userId);
    if (!userEntity.kyc) {
      throw new UnauthorizedException();
    }
    createEntityDto.user = userEntity;
    return await this.providerRepository.createEntity(createEntityDto);
  }

  async findAllEntities(): Promise<ProviderEntity[]> {
    return await this.providerRepository.findAllEntities();
  }

  async findByEntity(searchTerm: string): Promise<ProviderEntity> {
    return await this.providerRepository.findByEntity(searchTerm);
  }

  async findOneEntity(providerId: string): Promise<ProviderEntity> {
    return await this.providerRepository.findOneEntity(providerId);
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdateProviderDto,
  ): Promise<UpdateResult> {
    return await this.providerRepository.updateEntity(id, updateEntityDto);
  }

  async UpdateProviderStatus(
    providerId: string,
    updateProviderStatusDto: UpdateProviderStatusDto,
  ) {
    return await this.providerRepository.UpdateProviderStatus(
      providerId,
      updateProviderStatusDto,
    );
  }
}
