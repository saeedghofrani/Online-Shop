import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { RouteMethodeEnum } from 'src/entities/AUTH/enum/route-method.enum';
import { PermissionEntity } from 'src/entities/AUTH/permission.entity';
import { RouteEntity } from 'src/entities/AUTH/route.entity';

export class UpdateRouteDto implements Partial<RouteEntity> {
  @ApiProperty()
  address: string;

  @ApiProperty({ example: { property: 'value' } })
  query: Record<string, string>;

  @ApiProperty({ type: 'enum', enum: RouteMethodeEnum })
  method: RouteMethodeEnum;

  @ApiProperty()
  summary: string;

  @ApiProperty()
  jwt: boolean;

  @ApiProperty({ example: { property: 'value' } })
  body: Record<string, string>;

  @ApiProperty()
  status: boolean;

  @ApiProperty()
  id_permissions: string[];

  @ApiHideProperty()
  permissions: PermissionEntity[];
}
