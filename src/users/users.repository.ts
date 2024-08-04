import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  create(data: CreateUserDto) {
    return this.prisma.users.create({ data });
  }

  async findOne(id: number) {
    if (!id) {
      return null;
    }

    return this.prisma.users.findFirst({
      where: {
        id,
      },
    });
  }

  async find(email: string) {
    return this.prisma.users.findMany();
  }

  async update(id: number, attrs: Partial<UserDto>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    Object.assign(user, attrs);
    return user;
  }

  async delete(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.users.delete({
      where: {
        id,
      },
    });
  }
}
