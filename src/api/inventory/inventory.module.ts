import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ProviderController } from './provider/controller/provider.controller';
import { ProviderRepository } from './provider/repository/provider.repository';
import { ProviderService } from './provider/service/provider.service';
import { SummaryController } from './summary/controller/summary.controller';
import { SummaryRepository } from './summary/repository/summary.repository';
import { SummaryService } from './summary/service/summary.service';

@Module({
  imports: [AuthModule],
  controllers: [ProviderController, SummaryController],
  providers: [
    ProviderService,
    ProviderRepository,
    SummaryService,
    SummaryRepository,
  ],
  exports: [ProviderService, ProviderRepository],
})
export class InventoryModuel {}
