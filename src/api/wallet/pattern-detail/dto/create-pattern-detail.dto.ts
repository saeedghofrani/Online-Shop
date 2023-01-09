import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { installmentType } from 'src/entities/WALLET/enum/installment-type.enum';
import { PenaltyType } from 'src/entities/WALLET/enum/penalty-type.enum';
import { PatternMasterEntity } from 'src/entities/WALLET/pattern-master.entity';

export class CreatePatternDetailDto {
    @ApiProperty()
    amount: number;

    @ApiProperty()
    period: string;

    @ApiProperty()
    priorety: number;

    @ApiHideProperty()
    pattern_master: PatternMasterEntity;
}
