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
import {UserPaymentController} from "../user-payment/controller/user-payment.controller";
import {UserPaymentService} from "../user-payment/services/user-payment.service";
import {UserPaymentRepository} from "../user-payment/repositories/user-payment.repository";

@Module({
  imports: [AuthModule],
  controllers: [
    AccountController,
    PricingController,
    OrderController,
    WalletController,
      UserPaymentController
  ],
  providers: [
    AccountService,
    AccountRepository,
    PricingService,
    PricingRepository,
    OrderService,
    OrderRepository,
    WalletService,
    WalletRepository,
      UserPaymentService,
      UserPaymentRepository
  ],
})
export class WalletModule {}
