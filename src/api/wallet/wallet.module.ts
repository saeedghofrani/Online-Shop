import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ProductModule } from '../product/product.module';
import { AccountController } from './account/controllers/account.controller';
import { AccountRepository } from './account/repositories/account.repository';
import { AccountService } from './account/services/account.service';
import { OrderController } from './order/controller/order.controller';
import { OrderRepository } from './order/repositories/order.repository';
import { OrderService } from './order/service/order.service';
import { PatternDetailController } from './pattern-detail/controller/pattern-detail.controller';
import { PatternDetailRepository } from './pattern-detail/repository/pattern-detail.repository';
import { PatternDetailService } from './pattern-detail/service/pattern-detail.service';
import { PatternMasterController } from './pattern-master/controller/pattern-master.controller';
import { PatternMasterRepository } from './pattern-master/repository/pattern-master.repository';
import { PatternMasterService } from './pattern-master/service/pattern-master.service';
import { UserPaymentController } from './user-payment/controller/user-payment.controller';
import { UserPaymentRepository } from './user-payment/repositories/user-payment.repository';
import { UserPaymentService } from './user-payment/services/user-payment.service';
import { WalletController } from './wallet/controller/wallet.controller';
import { WalletRepository } from './wallet/repositories/wallet.repository';
import { WalletService } from './wallet/services/wallet.service';

@Module({
  imports: [AuthModule, ProductModule],
  controllers: [
    AccountController,
    OrderController,
    PatternDetailController,
    PatternMasterController,
    WalletController,
    UserPaymentController,
  ],
  providers: [
    AccountService,
    AccountRepository,
    PatternDetailRepository,
    PatternDetailService,
    PatternMasterRepository,
    PatternMasterService,
    OrderService,
    OrderRepository,
    WalletService,
    WalletRepository,
    UserPaymentService,
    UserPaymentRepository,
  ],
})
export class WalletModule {}
