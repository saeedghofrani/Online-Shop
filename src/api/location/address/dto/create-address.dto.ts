import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/auth/user.entity';
import { AddressEntity } from 'src/entities/location/address.entity';
import { CityEntity } from 'src/entities/location/city.entity';

export class CreateAddressDto implements Partial<AddressEntity> {
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

  @ApiHideProperty()
  userId?: string;

  @ApiProperty()
  cityId: string;

  @ApiHideProperty()
  user: UserEntity;

  @ApiHideProperty()
  city: CityEntity;
}
