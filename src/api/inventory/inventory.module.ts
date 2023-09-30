import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ProviderController } from './provider/controller/provider.controller';
import { ProviderRepository } from './provider/repository/provider.repository';
import { ProviderService } from './provider/service/provider.service';
import { SummaryController } from './summary/controller/summary.controller';
import { SummaryRepository } from './summary/repository/summary.repository';
import { SummaryService } from './summary/service/summary.service';
import { WebController } from './web/controller/web.controller';
import { WebService } from './web/service/web.service';
import { WebRepository } from './web/repository/web.repository';

@Module({
  imports: [AuthModule],
  controllers: [ProviderController, SummaryController, WebController],
  providers: [
    ProviderService,
    ProviderRepository,
    SummaryService,
    SummaryRepository,
    WebService,
    WebRepository
  ],
  exports: [ProviderService, ProviderRepository],
})
export class InventoryModuel { }
