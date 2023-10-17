import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookFormDto } from './dtos/book_form.dto';
import { BookFormUpdateDto } from './dtos/book_form_update.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class BookService {
  constructor(
    private prisma : PrismaService
  ) {}
  
  async createBook(dto : BookFormDto) {
    const book = await this.prisma.book.create({
      data: {
        titre: dto.titre,
        description: dto.description,
        authorId: dto.authorId
      }
    })
    return book;
  }

  async getBook(id : number) {
    const book = await this.prisma.book.findUnique({
      where: {id : id},
      //include: { author: true }
    });
    if (!book) throw new NotFoundException('Book not found.');
    return book;
  }

  async getAuthorOfBook(id : number) {
    const book = await this.prisma.book.findUnique({
      where: {id : id},
      include: { author: true }
    });
    if (!book) throw new NotFoundException('Book not found.');
    return book.author;
  }

  async updateBook(id : number, dto: BookFormUpdateDto) {
    const book = await this.prisma.book.update({
      where: { id : id },
      data: { ...dto }
    });

    return book;
  }

  async deleteBook(id: number) {
    try {
      await this.prisma.book.delete({
        where: {id : id}
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new NotFoundException('Book not found.');
        }
        console.log(e);
      }
    }


    return { status : 'DELETED' }
  }
}
