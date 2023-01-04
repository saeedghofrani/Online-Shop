import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "src/entities/AUTH/user.entity";

export class CreateAccountDto{
  @ApiHideProperty()
    user: UserEntity;

    @ApiProperty()
  account: string;

  @ApiProperty()
  iban: string;
}