import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { CityEntity } from 'entities/location/city.entity';
import { StateEntity } from 'entities/location/state.entity';

export class CreateCityDto implements Partial<CityEntity> {
  @ApiProperty()
  name: string;

  @ApiProperty()
  stateId: string;

  @ApiHideProperty()
  state: StateEntity;
}
