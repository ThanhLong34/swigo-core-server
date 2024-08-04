import { Injectable } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepo: UsersRepository) {}

  create(data: CreateUserDto) {
    return this.usersRepo.create(data);
  }

  async findOne(id: number) {
    return this.usersRepo.findOne(id);
  }

  async find(email: string) {
    return this.usersRepo.find(email);
  }

  async update(id: number, attrs: Partial<UserDto>) {
    return this.usersRepo.update(id, attrs);
  }

  async delete(id: number) {
    return this.usersRepo.delete(id);
  }
}
