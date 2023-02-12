import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/AUTH/user.entity';
import { CityEntity } from 'src/entities/LOCATION/city.entity';

export class UpdateAddressDto {
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
  cityId: string;

  @ApiHideProperty()
  city: CityEntity;
}
