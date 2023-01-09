import { ApiProperty } from '@nestjs/swagger';
import { installmentType } from 'src/entities/WALLET/enum/installment-type.enum';
import { PenaltyType } from 'src/entities/WALLET/enum/penalty-type.enum';

export class UpdatePatternMasterDto {
    @ApiProperty()
    amount: number;

    @ApiProperty()
    interest_rates: number;

    @ApiProperty()
    installmentType: installmentType;

    @ApiProperty()
    penaltyType: PenaltyType;

    @ApiProperty()
    penalty: number;
}
