import { Length, IsString, IsOptional   } from "class-validator";

export class UserUpdateDto {
  
  @IsOptional()
  @IsString()
  @Length(2,30,{message:'First name must be between 2 and 30 characters'})
  firstName: string
  
  @IsOptional()
  @IsString()
  @Length(2, 30, { message: 'LastName name must be between 2 and 30 characters' })
  lastName: string
  
  @IsOptional()
  @Length(0, 200, { message: 'Details must be up to 200 characters' })
  details: string

}