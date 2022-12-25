import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePermissionDto {
  @ApiPropertyOptional()
  name: string;
}
