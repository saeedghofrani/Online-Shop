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

@Module({
    imports:[AuthModule],
    controllers:[AccountController,PricingController,OrderController],
    providers:[AccountService,AccountRepository,PricingService,PricingRepository,OrderService,OrderRepository]
})
export class WalletModule{}