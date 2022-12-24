import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiHideProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  default: boolean;
}
