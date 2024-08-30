import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from '@system/auth/auth.service';
import { BaseService } from '@/core/base.service';
import { v4 as uuidv4 } from 'uuid';

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

    // Gen uuid
    _data.uuid = uuidv4();

    const userAuth = await this.authSrv.signup(_data);
    return await super.create(userAuth);
  }
}
