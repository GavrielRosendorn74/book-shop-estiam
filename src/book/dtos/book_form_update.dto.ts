import { PartialType } from "@nestjs/mapped-types";
import { BookFormDto } from "./book_form.dto";

export class BookFormUpdateDto extends PartialType(BookFormDto) {}