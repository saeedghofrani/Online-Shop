import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional()
  mobile?: string;

  @ApiPropertyOptional()
  email: string;

  @ApiPropertyOptional()
  password: string;
}
