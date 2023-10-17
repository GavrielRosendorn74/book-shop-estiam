import { IsInt, IsNotEmpty, IsString, MinLength, ValidateIf } from "class-validator"

export class AuthorFormDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  prenom

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  nom
}