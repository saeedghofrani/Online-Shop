import { Injectable } from '@nestjs/common';
import { StateEntity } from 'src/entities/LOCATION/state.entity';
import { UpdateResult } from 'typeorm';
import { CreateStateDto } from '../dto/create-state.dto';
import { UpdateStateDto } from '../dto/update-state.dto';
import { StateRepository } from '../repositories/state.repository';

@Injectable()
export class StateService {
  constructor(private stateRepository: StateRepository) {}

  async createEntity(createEntityDto: CreateStateDto): Promise<StateEntity> {
    return await this.stateRepository.createEntity(createEntityDto);
  }
  async updateEntity(
    id: string,
    updateEntityDto: UpdateStateDto,
  ): Promise<UpdateResult> {
    return await this.stateRepository.updateEntity(id, updateEntityDto);
  }
  async findOneEntity(id: string): Promise<StateEntity> {
    return await this.stateRepository.findOneEntity(id);
  }
  async findAllEntities(): Promise<StateEntity[]> {
    return await this.stateRepository.findAllEntities();
  }
}
