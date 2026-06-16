import { IsEmail, Length, IsString } from "class-validator";

export class UserLoginDto{
    @IsEmail({}, {message:"Email must be valid"})
    email: string

    @IsString()
    @Length(2, 20, { message: 'Password  must be between 8 and 15 characters' })
    password: string
}