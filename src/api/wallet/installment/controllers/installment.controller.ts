import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RepositoriesAbstract } from 'src/common/abstract/repositories.abstract';
import { GetUser } from 'src/common/decorator/user.decorator';
import { UserInterface } from 'src/common/interfaces/user.interface';
import { InstallmentEntity } from 'src/entities/WALLET/installment.entity';
import { UpdateResult } from 'typeorm';
import { CreateInstallmentDto } from '../dto/create-installment.dto';
import { UpdateInstallmentDto } from '../dto/update-installment.dto';
import { InstallmentService } from '../services/installment.service';

@ApiBearerAuth('access-token')
@ApiTags('Installment')
@Controller('installment')
export class InstallmentController {
  constructor(private installmentService: InstallmentService) {}

  @Post()
  createEntity(
    @Body() createEntityDto: CreateInstallmentDto,
    @Query('pattern_detail_id') pattern_detail_id: string,
    @Query('user_factor_id') user_factor_id: string,
  ): Promise<InstallmentEntity> {
    return this.installmentService.createEntity(
      createEntityDto,
      pattern_detail_id,
      user_factor_id,
    );
  }
  @Patch()
  updateEntity(
    @Query('installment_id') id: string,
    @Body() updateEntityDto: UpdateInstallmentDto,
    @Query('pattern_detail_id') pattern_detail_id: string,
    @Query('user_factor_id') user_factor_id: string,
  ): Promise<UpdateResult> {
    return this.installmentService.updateEntity(
      id,
      updateEntityDto,
      pattern_detail_id,
      user_factor_id,
    );
  }
  @Get()
  findOneEntity(
    @Query('installment_id') id: string,
  ): Promise<InstallmentEntity> {
    return this.installmentService.findOneEntity(id);
  }
  @Get('all')
  findAllEntities(): Promise<InstallmentEntity[]> {
    return this.installmentService.findAllEntities();
  }
}
