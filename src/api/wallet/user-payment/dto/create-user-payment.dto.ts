import {Column} from "typeorm";
import {ColumnNumericTransformer} from "../../../../common/classes/column-numeric-transformer.class";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserPaymentDto {

    @ApiProperty()
    dou_date: Date;

    @ApiProperty()
    amount: number;
}