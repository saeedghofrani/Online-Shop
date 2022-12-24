import { ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiHideProperty()
  id: string;

  @ApiPropertyOptional()
  first_name: string;

  @ApiPropertyOptional()
  last_name: string;
}
