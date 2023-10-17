import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorFormUpdateDto } from './dtos/author_form_update.dto';
import { AuthorFormDto } from './dtos/author_form.dto';

@Controller('author')
export class AuthorController {
  constructor(
    private authorService : AuthorService
  ) {}

  @Get(':id/books')
  getAuthorBooks(@Param('id', ParseIntPipe) id : number) {
    return this.authorService.getAuthorBooks(id);
  }

  @Get(':id')
  getAuthor(@Param('id', ParseIntPipe) id : number) {
    return this.authorService.getAuthor(id);
  }

  @Post()
  createAuthor(@Body() dto : AuthorFormDto) {
    return this.authorService.createAuthor(dto);
  }

  @Patch(':id')
  updateAuthor(
    @Param('id', ParseIntPipe) id : number,
    @Body() dto : AuthorFormUpdateDto
  ) {
    return this.authorService.updateAuthor(id, dto);
  }

  @Delete(':id')
  deleteAuthor(
    @Param('id', ParseIntPipe) id : number,
  ) {
    return this.authorService.deleteAuthor(id);
  }
}
