import { IsEmail, IsString, MinLength } from 'class-validator';
import { Match } from 'src/common/decoratos';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword: string;
}
