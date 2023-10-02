import { ApiPropertyOptional } from '@nestjs/swagger';
import { PermissionEntity } from 'entities/auth/permission.entity';

export class UpdatePermissionDto implements Partial<PermissionEntity> {
  @ApiPropertyOptional()
  name: string;
}
