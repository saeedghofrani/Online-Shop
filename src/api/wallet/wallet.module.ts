import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AccountController } from './account/controllers/account.controller';
import { AccountRepository } from './account/repositories/account.repository';
import { AccountService } from './account/services/account.service';
import { PricingController } from './pricing/controller/pricing.controller';
import { PricingService } from './pricing/services/pricing.service';
import { PricingRepository } from './pricing/repositories/pricing.repository';
import { OrderController } from './order/controller/order.controller';
import { OrderService } from './order/service/order.service';
import { OrderRepository } from './order/repositories/order.repository';
import { WalletController } from './wallet/controller/wallet.controller';
import { WalletService } from './wallet/services/wallet.service';
import { WalletRepository } from './wallet/repositories/wallet.repository';
import { PatternDetailController } from './pattern-detail/controller/pattern-detail.controller';
import { PatternMasterController } from './pattern-master/controller/pattern-master.controller';
import { PatternDetailRepository } from './pattern-detail/repository/pattern-detail.repository';
import { PatternDetailService } from './pattern-detail/service/pattern-detail.service';
import { PatternMasterRepository } from './pattern-master/repository/pattern-master.repository';
import { PatternMasterService } from './pattern-master/service/pattern-master.service';

@Module({
  imports: [AuthModule],
  controllers: [
    AccountController,
    PricingController,
    OrderController,
    PatternDetailController,
    PatternMasterController,
    WalletController,
  ],
  providers: [
    AccountService,
    AccountRepository,
    PricingService,
    PricingRepository,
    PatternDetailRepository,
    PatternDetailService,
    PatternMasterRepository,
    PatternMasterService,
    OrderService,
    OrderRepository,
    WalletService,
    WalletRepository,
  ],
})
export class WalletModule {}
