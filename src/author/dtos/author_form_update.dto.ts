import { PartialType } from "@nestjs/mapped-types";
import { AuthorFormDto } from "./author_form.dto";

export class AuthorFormUpdateDto extends PartialType(AuthorFormDto) {}