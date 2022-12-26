import { CityEntity } from 'src/entities/LOCATION/city.entity';
import { UpdateResult } from 'typeorm';
import { StateService } from '../../state/services/state.service';
import { CreateCityDto } from '../dto/create-city.dto';
import { UpdateCityDto } from '../dto/update-city.dto';
import { CityRepository } from '../repositories/city.repository';

export class CityService {
  constructor(
    private cityRepository: CityRepository,
    private stateService: StateService,
  ) {}

  async createEntity(createEntityDto: CreateCityDto): Promise<CityEntity> {
    const findState = await this.stateService.findOneEntity(
      createEntityDto.stateId,
    );
    createEntityDto.state = findState;
    return await this.cityRepository.createEntity(createEntityDto);
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdateCityDto,
  ): Promise<UpdateResult> {
    const findState = await this.stateService.findOneEntity(
      updateEntityDto.stateId,
    );
    updateEntityDto.state = findState;
    return await this.cityRepository.updateEntity(id, updateEntityDto);
  }

  async findOneEntity(id: string): Promise<CityEntity> {
    return await this.cityRepository.findOneEntity(id);
  }

  async findAllEntities(): Promise<CityEntity[]> {
    return await this.cityRepository.findAllEntities();
  }
}
