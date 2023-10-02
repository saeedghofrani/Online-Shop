import { ApiProperty } from '@nestjs/swagger';
import { StateEntity } from 'entities/location/state.entity';

export class UpdateStateDto implements Partial<StateEntity> {
  @ApiProperty()
  name: string;
}
