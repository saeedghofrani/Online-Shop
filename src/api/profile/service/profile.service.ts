import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from 'src/entities/AUTH/profile.entity';
import { ProfileRepository } from '../repositories/profile.repository';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';


@Injectable()
export class ProfileService {
  constructor(
    private profileRepository:ProfileRepository,
  ) {}

  async createEntity(
    createEntityDto: CreateProfileDto,
  ): Promise<ProfileEntity> {
    return await this.profileRepository.createEntity(createEntityDto)
  }

  async findAllEntities(): Promise<ProfileEntity[]> {
    return await this.profileRepository.findAllEntities()
  }

  async findByEntity(searchTerm: string): Promise<ProfileEntity> {
    return await this.profileRepository
      .findByEntity(searchTerm)
  }

  async findOneEntity(profileId: string): Promise<ProfileEntity> {
    return await this.profileRepository
      .findOneEntity(profileId)
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdateProfileDto,
  ): Promise<UpdateResult> {
    return await this.profileRepository.updateEntity(id,updateEntityDto)
  }
}
