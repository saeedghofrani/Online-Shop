import { ApiHideProperty } from '@nestjs/swagger';

export class UpdateRoleDto {
  @ApiHideProperty()
  name: string;

  @ApiHideProperty()
  default: boolean;
}
