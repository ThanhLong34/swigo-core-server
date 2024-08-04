import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor() {}

  create(data: { email: string; password: string }) {
    console.log(data);
    return data;
  }

  async findOne(id: number) {
    if (!id) {
      return null;
    }

    const user = new User();
    user.id = id;
    user.isAdmin = false;
    user.email = '';
    user.password = '';

    return user;
  }

  async find(email: string) {
    return [
      {
        email,
        password: '',
      },
    ];
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    Object.assign(user, attrs);
    return user;
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }
}
