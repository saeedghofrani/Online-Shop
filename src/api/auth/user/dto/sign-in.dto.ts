import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class SignInDto {
    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    mobile: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    prefix: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    password: string;
}