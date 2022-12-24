import { ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiHideProperty()
  id: string;

  @ApiPropertyOptional()
  mobile?: string;

  @ApiPropertyOptional()
  email?: string;

  @ApiPropertyOptional()
  password?: string;
}
