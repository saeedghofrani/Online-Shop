import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/AUTH/user.entity';
import { FileTypeEnum } from 'src/entities/public/enum/file-type.enum';

export class CreateFileDto {
  @ApiHideProperty()
  originalName: string;

  @ApiHideProperty()
  file_name: string;

  @ApiHideProperty()
  mime_type: string;

  @ApiHideProperty()
  extension: string;

  @ApiHideProperty()
  size: number;

  @ApiHideProperty()
  path: string;

  @ApiHideProperty()
  compressedFileName: string;

  @ApiProperty()
  relation_id: string;

  @ApiProperty({
    type: 'enum',
    enum: FileTypeEnum,
    default: FileTypeEnum.PRODUCT,
  })
  status: FileTypeEnum;

  @ApiHideProperty()
  user: UserEntity;
}
