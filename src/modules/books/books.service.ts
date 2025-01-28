import { ForbiddenException, Injectable } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class BooksService {
    constructor(private readonly booksRepository: BooksRepository, private usersRepository: UsersRepository) { }

    // Получить список всех книг
    async getAllBooks(): Promise<Book[]> {
        return this.booksRepository.findAll();
    }

    // Получить книгу по ID
    async getBookById(id: number): Promise<Book> {
        return this.booksRepository.findOneOrNotFoundFail(id);
    }

    // Создать новую книгу
    async createBook(dto: CreateBookDto, userId: number): Promise<void> {
        const user = await this.usersRepository.findByIdOrNotFoundFail(userId);

        const book = Book.createBook(dto, userId, user.age);

        await this.booksRepository.save(book);
    }

    // Удалить книгу
    async removeBook(id: number): Promise<void> {
        await this.booksRepository.remove(id);
    }
}
