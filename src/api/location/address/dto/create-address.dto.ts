import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/AUTH/user.entity';
import { CityEntity } from 'src/entities/LOCATION/city.entity';

export class CreateAddressDto {
  @ApiProperty()
  address: string;

  @ApiProperty()
  building_number: string;

  @ApiProperty()
  full_name: string;

  @ApiProperty()
  is_default: boolean;

  @ApiProperty()
  latitude: string;

  @ApiProperty()
  longitude: string;

  @ApiProperty()
  postal_code: string;

  @ApiProperty()
  telephone: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  cityId: string;

  @ApiHideProperty()
  user: UserEntity;

  @ApiHideProperty()
  city: CityEntity;
}
