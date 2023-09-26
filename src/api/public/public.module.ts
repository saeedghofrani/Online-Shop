import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ProductModule } from '../product/product.module';
import { FileController } from './file/controller/file.controller';
import { FileService } from './file/service/file.service';
import { FileRepository } from './file/repository/file.repository';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    AuthModule,
    ProductModule,
    MulterModule.register({
      dest: './uploads', // Define your upload directory
    }),
  ],
  controllers: [FileController],
  providers: [FileService, FileRepository],
})
export class PublicModule {}
