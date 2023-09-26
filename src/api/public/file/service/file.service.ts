import { Injectable, NotFoundException } from '@nestjs/common';
import { createReadStream } from 'fs';
import * as sharp from 'sharp';
import { UserService } from 'src/api/auth/user/service/user.service';
import { FileRepository } from '../repository/file.repository';
import { CreateFileDto } from '../dto/create-file.dto';
import { FileTypeEnum } from 'src/entities/public/enum/file-type.enum';
import { Readable } from 'typeorm/platform/PlatformTools';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { Paginated } from 'nestjs-paginate';
import { FileEntity } from 'src/entities/public/file.entity';
import { UpdateFileDto } from '../dto/update-file.dto';
import { UpdateResult } from 'typeorm';

@Injectable()
export class FileService {
    constructor(
        private fileRepository: FileRepository,
        private userService: UserService,
    ) { }

    async uploadFile(file: Express.Multer.File, relation_id: string, status: FileTypeEnum, userId: string): Promise<string> {
        try {
            console.log(file);
            // Implement file upload, compression, and categorization here
            const extension = file.originalname.split('.').pop();
            const originalName = file.originalname;
            const fileName = file.filename;
            const mimeType = file.mimetype;
            const size = file.size;
            file.path = `uploads/${fileName}`
            const compressedFileName = `${fileName}-compressed.${extension}`;
            await sharp(file.path)
                .resize(800, 600)
                .toFile(`uploads/${compressedFileName}`);
            const createFileDto = new CreateFileDto();
            createFileDto.compressedFileName = compressedFileName;
            createFileDto.extension = extension;
            createFileDto.file_name = fileName;
            createFileDto.mime_type = mimeType;
            createFileDto.originalName = originalName;
            createFileDto.relation_id = relation_id;
            createFileDto.size = size;
            createFileDto.status = status;
            createFileDto.path = file.path
            createFileDto.user = await this.userService.findOneEntity(userId);
            console.log(createFileDto);

            const newFile = await this.fileRepository.createEntity(createFileDto);
            return newFile.id;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async downloadFile(id: string): Promise<string> {
        // Implement file download logic here
        const file = await this.fileRepository.findOneEntity(id);
        if (!file)
            throw new NotFoundException('File not found');
        const filePath = process.cwd() + `/uploads/${file.compressedFileName}`;
        console.log(filePath);
        return filePath;
    }

    async streamFile(id: string): Promise<Readable> {
        // Implement file streaming logic here
        const file = await this.fileRepository.findOneEntity(id);
        if (!file)
            throw new NotFoundException('File not found');
        const filePath = process.cwd() + `/uploads/${file.compressedFileName}`;
        const stream = createReadStream(filePath);
        return stream;
    }

    async findAllEntities(): Promise<FileEntity[]> {
        return await this.fileRepository.findAllEntities();
    }

    async findOneEntity(providerId: string): Promise<FileEntity> {
        return await this.fileRepository.findOneEntity(providerId);
    }

    async findFile(type: FileTypeEnum, id: string): Promise<FileEntity[]> {
        return await this.fileRepository.findFile(type, id);
    }

    async updateEntity(
        id: string,
        updateFileDto: UpdateFileDto,
    ): Promise<UpdateResult> {
        return await this.fileRepository.updateEntity(id, updateFileDto);
    }

    async filePagination(
        query: PaginationQueryDto,
    ): Promise<Paginated<FileEntity>> {
        return this.fileRepository.filePagination(query);
    }

    async removeFile(id: string): Promise<UpdateResult> {
        return await this.fileRepository.removeFile(id);
    }
}