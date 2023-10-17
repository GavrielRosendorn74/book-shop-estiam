import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';

@Module({
  imports: [PrismaModule, BookModule, AuthorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
