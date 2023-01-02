import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductAttribute{
    @ApiProperty()
    value: string;
  
    @ApiProperty()
    unit: string;
}