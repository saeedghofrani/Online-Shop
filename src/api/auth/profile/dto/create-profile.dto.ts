import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiPropertyOptional()
  first_name: string;

  @ApiPropertyOptional()
  last_name: string;
}
