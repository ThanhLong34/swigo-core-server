import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  create(data: CreateUserDto) {
    data.uuid = 'uuid-gen';
    return this.prisma.sys_users.create({ data });
  }

  async findByEmail(email: string) {
    return this.prisma.sys_users.findFirst({
      where: {
        email,
      },
    });
  }

  async findByUsername(username: string) {
    return this.prisma.sys_users.findFirst({
      where: {
        username,
      },
    });
  }

  async findById(id: number) {
    return this.prisma.sys_users.findFirst({
      where: {
        id,
      },
    });
  }

  async findAll() {
    return this.prisma.sys_users.findMany();
  }

  async update(id: number, attrs: Partial<UserDto>) {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    Object.assign(user, attrs);
    return user;
  }

  async softDelete(id: number) {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.sys_users.delete({
      where: {
        id,
      },
    });
  }
}
