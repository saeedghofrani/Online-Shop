import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { StateEntity } from 'src/entities/LOCATION/state.entity';

export class CreateCityDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  stateId: string;

  @ApiHideProperty()
  state: StateEntity;
}
