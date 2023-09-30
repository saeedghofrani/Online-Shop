import { ApiPropertyOptional } from '@nestjs/swagger';
import { PermissionEntity } from 'src/entities/AUTH/permission.entity';

export class UpdatePermissionDto implements Partial<PermissionEntity> {
  @ApiPropertyOptional()
  name: string;
}
