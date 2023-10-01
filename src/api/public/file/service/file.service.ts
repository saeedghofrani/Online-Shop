import { Injectable, NotFoundException } from '@nestjs/common';
import { createReadStream } from 'fs';
import { unlink, stat, readFile } from 'fs/promises';
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
import {join} from 'path';

@Injectable()
export class FileService {
  constructor(
    private fileRepository: FileRepository,
    private userService: UserService,
  ) { }

  async uploadFile(
    file: Express.Multer.File,
    relation_id: number,
    type: FileTypeEnum,
    userId: string,
  ): Promise<string> {
    try {
      // Implement file upload, compression, and categorization here
      const extension = file.originalname.split('.').pop();
      const originalName = file.originalname;
      const fileName = file.filename;
      const mimeType = file.mimetype;
      const size = file.size;
      file.path = `uploads/${fileName}`;
      const compressedFileName = `${fileName}-compressed.${extension}`;
      await sharp(file.path)
        .resize(800, 600)
        .toFile(`uploads/${compressedFileName}`);
      // unlink(process.cwd() + '/' + file.path);
      const createFileDto = new CreateFileDto();
      createFileDto.compressedFileName = compressedFileName;
      createFileDto.extension = extension;
      createFileDto.file_name = fileName;
      createFileDto.mime_type = mimeType;
      createFileDto.originalName = originalName;
      createFileDto.relation_id = relation_id;
      createFileDto.size = size;
      createFileDto.type = type;
      createFileDto.path = file.path;
      createFileDto.user = await this.userService.findOneEntity(userId);
      const newFile = await this.fileRepository.createEntity(createFileDto);
      return newFile.id;
    } catch (error) {
      throw error;
    }
  }

  async downloadFile(id: string, res: any) {
    try {
      // Implement file retrieval logic here
      const file = await this.fileRepository.findOneEntity(id);
      if (!file) throw new NotFoundException('File not found');
      const filePath = join(process.cwd(), file.path); // Corrected path join
      console.log(filePath);
      res.sendFile(filePath);
    } catch (error) {
      throw error;
    }
  }

  async downloadFileCompressed(id: string, res: any) {
    try {
      // Implement file retrieval logic here
      const file = await this.fileRepository.findOneEntity(id);
      if (!file) throw new NotFoundException('File not found');
      const filePath = join(process.cwd(), `uploads/${file.compressedFileName}`); // Corrected path join
      console.log(filePath);
      res.sendFile(filePath);
    } catch (error) {
      throw error;
    }
  }

  async getFile(id: string) {
    const file = await this.fileRepository.findOneEntity(id);
    if (!file) throw new NotFoundException('File not found');
  
    const filePath = join(process.cwd(), file.path);
    const fileContent = await readFile(filePath, 'base64');
  
    return { data: fileContent };
  }

  async getFileDirect(id: string) {
    const file = await this.fileRepository.findOneEntity(id);
    if (!file) throw new NotFoundException('File not found');
    const fileUrl = `/${file.path}`;
    return { url: fileUrl };
  }

  async streamFile(id: string): Promise<Readable> {
    try {
      // Implement file streaming logic here
      const file = await this.fileRepository.findOneEntity(id);
      if (!file) throw new NotFoundException('File not found');
      const filePath = process.cwd() + `/uploads/${file.path}`;
      await stat(filePath);
      const stream = createReadStream(filePath);
      return stream;
    } catch (error) {
      throw error;
    }
  }

  async findAllEntities(): Promise<FileEntity[]> {
    try {
      return await this.fileRepository.findAllEntities();
    } catch (error) {
      throw error;
    }
  }

  async findOneEntity(providerId: string): Promise<FileEntity> {
    try {
      return await this.fileRepository.findOneEntity(providerId);
    } catch (error) {
      throw error;
    }
  }

  async findFile(type: FileTypeEnum, id: string): Promise<FileEntity[]> {
    try {
      return await this.fileRepository.findFile(type, id);
    } catch (error) {
      throw error;
    }
  }

  async updateEntity(
    id: string,
    updateFileDto: UpdateFileDto,
  ): Promise<UpdateResult> {
    try {
      return await this.fileRepository.updateEntity(id, updateFileDto);
    } catch (error) {
      throw error;
    }
  }

  async filePagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<FileEntity>> {
    try {
      return this.fileRepository.filePagination(query);
    } catch (error) {
      throw error;
    }
  }

  async removeFile(id: string): Promise<UpdateResult> {
    try {
      return await this.fileRepository.removeFile(id);
    } catch (error) {
      throw error;
    }
  }
}
