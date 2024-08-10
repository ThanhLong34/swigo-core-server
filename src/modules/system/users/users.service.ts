import { Injectable } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from '@system/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly authService: AuthService,
    private readonly usersRepo: UsersRepository,
  ) {}

  async create(data: CreateUserDto) {
    const userAuth = await this.authService.signup(data);
    return this.usersRepo.create(userAuth);
  }

  async findByEmail(email: string) {
    return this.usersRepo.findByEmail(email);
  }

  async findByUsername(username: string) {
    return this.usersRepo.findByUsername(username);
  }

  async findById(id: number) {
    return this.usersRepo.findById(id);
  }

  async findAll() {
    return this.usersRepo.findAll();
  }

  async update(id: number, attrs: Partial<UserDto>) {
    return this.usersRepo.update(id, attrs);
  }

  async delete(id: number) {
    return this.usersRepo.softDelete(id);
  }
}
