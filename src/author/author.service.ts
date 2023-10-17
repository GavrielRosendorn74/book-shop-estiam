import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthorFormUpdateDto } from './dtos/author_form_update.dto';
import { AuthorFormDto } from './dtos/author_form.dto';

@Injectable()
export class AuthorService {
  constructor(
    private prisma : PrismaService
  ) {}
  
  async createAuthor(dto : AuthorFormDto) {
    const author = await this.prisma.author.create({
      data: { ...dto }
    })
    return author;
  }

  async getAuthor(id : number) {
    const author = await this.prisma.author.findUnique({
      where: {id : id}
    });
    if (!author) throw new NotFoundException('Author not found.');
    return author;
  }

  async getAuthorBooks(id : number) {
    const author = await this.prisma.author.findUnique({
      where: {id : id},
      include: { books: true }
    });
    if (!author) throw new NotFoundException('Author not found.');
    return author.books;
  }

  async updateAuthor(id : number, dto: AuthorFormUpdateDto) {
    const author = await this.prisma.author.update({
      where: { id : id },
      data: { ...dto }
    });
    if (!author) throw new NotFoundException('Author not found.');
    return author;
  }

  async deleteAuthor(id: number) {
    try {
      await this.prisma.author.delete({
        where: {id : id}
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new NotFoundException('Author not found.');
        }
        console.log(e);
      }
    }


    return { status : 'DELETED' }
  }
}
