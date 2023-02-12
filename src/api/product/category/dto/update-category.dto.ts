import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { GroupEntity } from 'src/entities/PRODUCT/group.entity';

export class UpdateCategoryDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiHideProperty()
  group: GroupEntity;
}
