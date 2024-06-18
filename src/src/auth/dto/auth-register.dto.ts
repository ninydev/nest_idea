import { IsEmail, IsString, Length } from 'class-validator';

export class AuthRegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(1, 50)
  name: string;

  @IsString()
  @Length(6, 20)
  password: string;
}
