import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { GetUser } from 'common/decorator/user.decorator';
import { UseJwtGuard } from 'common/guards/jwt.guard';
import { UserInterface } from 'common/interfaces/user.interface';
import { FileService } from '../service/file.service';

@Controller('files')
@ApiTags('File')
// @UseJwtGuard()
// @ApiBearerAuth('access-token')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseJwtGuard()
  @ApiBearerAuth('access-token')
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('type') type: number,
    @Query('id') id: number,
    @GetUser() user: UserInterface,
  ) {
    return this.fileService.uploadFile(file, id, type, user.userId);
  }

  @Get(':id/download')
  async downloadFile(@Param('id') id: string, @Res() res: Response) {
    return await this.fileService.downloadFile(id, res);
  }

  @Get(':id/download/compressed')
  async downloadFileCompressed(@Param('id') id: string, @Res() res: Response) {
    return await this.fileService.downloadFileCompressed(id, res);
  }

  @Get(':id/base')
  async getFile(@Param('id') id: string) {
    return await this.fileService.getFile(id);
  }

  @Get(':id/stream')
  async streamFile(@Param('id') id: string, @Res() res: Response) {
    const file = await this.fileService.streamFile(id);
    file.pipe(res);
  }

  @Get(':id/direct')
  async getFileDirect(@Param('id') id: string) {
    return await this.fileService.getFileDirect(id);
  }

  @Delete()
  async removeFile(@Query('id') id: string) {
    return await this.fileService.removeFile(id);
  }
}
