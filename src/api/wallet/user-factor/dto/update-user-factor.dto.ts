import {ApiHideProperty, ApiProperty} from "@nestjs/swagger";
import { installmentType } from "src/entities/WALLET/enum/installment-type.enum";
import {PenaltyType} from "../../../../entities/WALLET/enum/penalty-type.enum";
import {PatternMasterEntity} from "../../../../entities/WALLET/pattern-master.entity";

export class UpdateUserFactorDto {
    @ApiProperty()
    purchase_date: Date;

    @ApiProperty()
    amount: number;

    @ApiProperty()
    installment_count: number;

    @ApiProperty()
    penaltyType: PenaltyType;

    @ApiProperty()
    total_amount: number;

    @ApiProperty()
    product_price: number;

    @ApiProperty()
    installmentType: installmentType;

}