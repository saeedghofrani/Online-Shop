import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { GroupEntity } from 'src/entities/PRODUCT/group.entity';

export class CreateCategoryDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiHideProperty()
  group: GroupEntity;
}
