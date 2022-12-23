import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiPropertyOptional()
  first_name: string;

  @ApiPropertyOptional()
  last_name: string;
}
