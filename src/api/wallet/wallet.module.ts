import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { AccountController } from "./account/controllers/account.controller";
import { AccountRepository } from "./account/repositories/account.repository";
import { AccountService } from "./account/services/account.service";
import {PricingController} from "./pricing/controller/pricing.controller";
import {PricingService} from "./pricing/services/pricing.service";
import {PricingRepository} from "./pricing/repositories/pricing.repository";
import {OrderController} from "./order/controller/order.controller";
import {OrderService} from "./order/service/order.service";
import {OrderRepository} from "./order/repositories/order.repository";
import {PaymentController} from "./payment/controller/payment.controller";
import {PaymentService} from "./payment/services/payment.service";
import {PaymentRepository} from "./payment/repositories/payment.repository";
import {WalletController} from "./wallet/controller/wallet.controller";
import {WalletService} from "./wallet/services/wallet.service";
import {WalletRepository} from "./wallet/repositories/wallet.repository";

@Module({
    imports:[AuthModule],
    controllers:[AccountController,PricingController,OrderController,PaymentController,WalletController],
    providers:[AccountService,AccountRepository,PricingService,PricingRepository,OrderService,OrderRepository,PaymentService,PaymentRepository,WalletService,WalletRepository]
})
export class WalletModule{}