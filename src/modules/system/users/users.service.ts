import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from '@system/auth/auth.service';
import { BaseService } from '@/core/base.service';

@Injectable()
export class UsersService extends BaseService {
  constructor(
    private readonly authSrv: AuthService,
    private readonly usersRepo: UsersRepository,
  ) {
    super(usersRepo);
  }

  async create(data: any) {
    const _data = data as CreateUserDto;

    let user = await this.usersRepo.findOne('username', _data.username);
    if (user) {
      throw new BadRequestException('Username already exists');
    }

    user = await this.usersRepo.findOne('email', _data.email);
    if (user) {
      throw new BadRequestException('Email already exists');
    }

    const userAuth = await this.authSrv.signup(data);
    return await super.create(userAuth);
  }

  // async create(data: CreateUserDto) {
  //   const userAuth = await this.authSrv.signup(data);
  //   return this.usersRepo.create(userAuth);
  // }

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
