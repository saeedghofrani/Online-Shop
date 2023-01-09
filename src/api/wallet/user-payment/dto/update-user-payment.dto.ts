import {ApiProperty} from "@nestjs/swagger";

export class UpdateUserPaymentDto {
    @ApiProperty()
    dou_date: Date;

    @ApiProperty()
    amount: number;
}