import { ApiProperty } from "@nestjs/swagger";

export class UpdateSummaryDto {
    @ApiProperty()
    description: string;
  
    @ApiProperty()
    count: string;
  
    @ApiProperty()
    minimum: number;
  
    @ApiProperty()
    unit: string;
}