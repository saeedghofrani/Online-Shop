import {UserEntity} from "../../../../entities/AUTH/user.entity";
import {ApiHideProperty, ApiProperty} from "@nestjs/swagger";

export class UpdateWalletDto {
    @ApiProperty()
    amount: number;

    @ApiProperty()
    amount_block: number;

}