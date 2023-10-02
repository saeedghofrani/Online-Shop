import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { UserEntity } from 'entities/auth/user.entity';
import { AddressEntity } from 'entities/location/address.entity';
import { CityEntity } from 'entities/location/city.entity';

export class UpdateAddressDto implements Partial<AddressEntity> {
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
