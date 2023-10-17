import { IsInt, IsNotEmpty, IsString, MinLength, ValidateIf } from "class-validator"

export class BookFormDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  titre

  @IsString()
  @ValidateIf((object, value) => value !== null)
  description

  @IsInt()
  @ValidateIf((object, value) => value !== null)
  authorId
}