import { ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePermissionDto {
  @ApiHideProperty()
  id: string;

  @ApiPropertyOptional()
  name: string;
}
