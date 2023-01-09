import {Column, ManyToOne} from "typeorm";
import {ColumnNumericTransformer} from "../../../../common/classes/column-numeric-transformer.class";
import {PenaltyType} from "../../../../entities/WALLET/enum/penalty-type.enum";
import {PatternMasterEntity} from "../../../../entities/WALLET/pattern-master.entity";
import {ApiHideProperty, ApiProperty} from "@nestjs/swagger";
import { installmentType } from "src/entities/WALLET/enum/installment-type.enum";

export class CreateUserFactorDto {
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

    @ApiHideProperty()
    pattern_master: PatternMasterEntity;
}