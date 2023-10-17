import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { BookFormDto } from './dtos/book_form.dto';
import { BookFormUpdateDto } from './dtos/book_form_update.dto';

@Controller('book')
export class BookController {
  constructor(
    private bookService : BookService
  ) {}

  @Get(':id/author')
  getAuthorOfBook(@Param('id', ParseIntPipe) id : number) {
    return this.bookService.getAuthorOfBook(id);
  }

  @Get(':id')
  getBook(@Param('id', ParseIntPipe) id : number) {
    return this.bookService.getBook(id);
  }

  @Post()
  createBook(@Body() dto : BookFormDto) {
    return this.bookService.createBook(dto);
  }

  @Patch(':id')
  updateBook(
    @Param('id', ParseIntPipe) id : number,
    @Body() dto : BookFormUpdateDto
  ) {
    return this.bookService.updateBook(id, dto);
  }

  @Delete(':id')
  deleteBook(
    @Param('id', ParseIntPipe) id : number,
  ) {
    return this.bookService.deleteBook(id);
  }
}
