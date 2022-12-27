import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "src/entities/AUTH/user.entity";

export class CreateProviderDto {
    @ApiProperty()
    address: string;

    @ApiProperty()
    latitude: string;

    @ApiProperty()
    longitude: string;

    @ApiHideProperty()
    user: UserEntity;
}