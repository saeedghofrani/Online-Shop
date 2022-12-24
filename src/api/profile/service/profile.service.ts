import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from 'src/entities/AUTH/profile.entity';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
  ) {}

  async createEntity(
    createEntityDto: CreateProfileDto,
  ): Promise<ProfileEntity> {
    return await this.profileRepository.save(
      this.profileRepository.create(createEntityDto),
    );
  }

  async findAllEntities(): Promise<ProfileEntity[]> {
    return await this.profileRepository.createQueryBuilder('profile').getMany();
  }

  async findByEntity(searchTerm: string): Promise<ProfileEntity> {
    return await this.profileRepository
      .createQueryBuilder('profile')
      .where(
        `profile.first_name = :searchTerm OR profile.last_name = :searchTerm`,
        {
          searchTerm,
        },
      )
      .getOne();
  }

  async findOneEntity(profileId: string): Promise<ProfileEntity> {
    return await this.profileRepository
      .createQueryBuilder('profile')
      .where('profile.id = :profileId', {
        profileId,
      })
      .getOne();
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdateProfileDto,
  ): Promise<UpdateResult> {
    const profileEntity = await this.findOneEntity(id);
    return await this.profileRepository.update(
      profileEntity.id,
      updateEntityDto,
    );
  }
}
