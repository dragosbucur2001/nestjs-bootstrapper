import { IsEmail, IsString, Validate } from "class-validator";
import { Match } from "src/utils/match.rule";

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string

  @IsString()
  @Match(RegisterUserDto, o => o.password)
  password_confirmation: string
}
