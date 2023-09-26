import { Controller, Delete, Get, Param, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { GetUser } from 'src/common/decorator/user.decorator';
import { UseJwtGuard } from 'src/common/guards/jwt.guard';
import { UserInterface } from 'src/common/interfaces/user.interface';
import { FileService } from '../service/file.service';

@Controller('files')
@ApiTags('File')
@UseJwtGuard()
@ApiBearerAuth('access-token')
export class FileController {
    constructor(private readonly fileService: FileService) { }

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
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Query('status') status: number,
        @Query('id') id: string,
        @GetUser() user: UserInterface
    ) {
        console.log(user);
        return this.fileService.uploadFile(file, id, status, user.userId);
    }

    @Get(':id/download')
    async downloadFile(@Param('id') id: string, @Res() res: Response) {
        const file = await this.fileService.downloadFile(id);
        res.sendFile(file);
    }

    @Get(':id/stream')
    async streamFile(@Param('id') id: string, @Res() res: Response) {
        const file = await this.fileService.streamFile(id);
        file.pipe(res);
    }

    @Delete(':id')
    async removeFile(@Param('id') id: string) {
        return await this.fileService.removeFile(id);
    }
}