import { IsEmail, Length, IsString } from 'class-validator';

export class UserRegisterDto {
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @IsString()
  @Length(2, 30, { message: 'First name must be between 2 and 30 characters' })
  firstName: string;

  @IsString()
  @Length(2, 30, {
    message: 'LastName name must be between 2 and 30 characters',
  })
  lastName: string;

  @IsString()
  @Length(5, 20, { message: 'Password  must be between 5 and 20 characters' })
  password: string;

  @Length(0, 200, { message: 'Details must be up to 200 characters' })
  details: string;
}
