import { ApiProperty } from '@nestjs/swagger';
import { StateEntity } from 'src/entities/LOCATION/state.entity';

export class UpdateStateDto implements Partial<StateEntity>{
  @ApiProperty()
  name: string;
}
