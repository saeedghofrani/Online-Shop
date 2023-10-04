import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
  Matches
} from 'class-validator';

export class SignInDto {
  @IsString()
  @ApiProperty()  
  @IsNotEmpty({ message: 'Mobile number is required' })
  @IsPhoneNumber('IR', { message: 'Invalid mobile number format' })
  mobile: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty({ message: 'Prefix is required' })
  @IsIn(['+98', '0'], { message: 'Prefix must be either "+98" or "0"' })
  prefix: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty({ message: 'Password is required' })
  @Length(1, 20, {
    message: 'Password length must be between 6 and 20 characters',
  })
  // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
  //   message: 'Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character',
  // })
  password: string;
}
