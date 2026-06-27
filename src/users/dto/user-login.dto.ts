import { IsEmail, Length, IsString } from 'class-validator';

export class UserLoginDto {
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @IsString()
  @Length(5, 20, { message: 'Password  must be between 5 and 20 characters' })
  password: string;
}
