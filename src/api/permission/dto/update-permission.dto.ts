import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePermissionDto {
  @ApiPropertyOptional()
  name: string;
}
