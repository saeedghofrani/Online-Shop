import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { CityEntity } from 'src/entities/LOCATION/city.entity';
import { StateEntity } from 'src/entities/LOCATION/state.entity';

export class UpdateCityDto implements Partial<CityEntity>{
  @ApiProperty()
  name: string;

  @ApiProperty()
  stateId: string;

  @ApiHideProperty()
  state: StateEntity;
}
