import {WalletService} from "../services/wallet.service";
import {CreateWalletDto} from "../dto/create-wallet.dto";
import {WalletEntity} from "../../../../entities/WALLET/wallet.entity";
import {UpdateWalletDto} from "../dto/update-wallet.dto";
import {UpdateResult} from "typeorm";
import {UserInterface} from "../../../../common/interfaces/user.interface";
import {Body, Get, Patch, Post, Query} from "@nestjs/common";
import {GetUser} from "../../../../common/decorator/user.decorator";

export class WalletController {
    constructor(private walletService:WalletService) {
    }

    @Post()
     createEntity(@Body() createEntityDto: CreateWalletDto,@GetUser() user:UserInterface): Promise<WalletEntity> {
        return  this.walletService.createEntity(createEntityDto,user.userId)
    }

    @Get("all")
     findAllEntities(): Promise<WalletEntity[]> {
        return  this.walletService.findAllEntities()
    }

    @Get()
     findOneEntity(@Query("wallet_id") id: string): Promise<WalletEntity> {
        return  this.walletService.findOneEntity(id)
    }

    @Patch()
     updateEntity(@Query("wallet_id") id: string,@Body() updateEntityDto: UpdateWalletDto): Promise<UpdateResult> {
        return  this.walletService.updateEntity(id,updateEntityDto)
    }
}