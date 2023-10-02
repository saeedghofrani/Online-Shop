import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { RouteMethodeEnum } from 'src/entities/auth/enum/route-method.enum';
import { PermissionEntity } from 'src/entities/auth/permission.entity';
import { RouteEntity } from 'src/entities/auth/route.entity';

export class CreateRouteDto implements Partial<RouteEntity> {
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
