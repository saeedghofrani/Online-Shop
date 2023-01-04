import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { AccountController } from "./account/controllers/account.controller";
import { AccountRepository } from "./account/repositories/account.repository";
import { AccountService } from "./account/services/account.service";

@Module({
    imports:[AuthModule],
    controllers:[AccountController],
    providers:[AccountService,AccountRepository]
})
export class WalletModule{}