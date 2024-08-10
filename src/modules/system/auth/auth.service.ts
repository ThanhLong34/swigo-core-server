import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { CreateUserDto } from '@system/users/dtos/create-user.dto';
import { SigninDto } from '@system/users/dtos/signin.dto';
import { UsersRepository } from '@system/users/users.repository';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersRepo: UsersRepository) {}

  async signup(payload: CreateUserDto) {
    let user = await this.usersRepo.findByUsername(payload.username);
    if (user) {
      throw new BadRequestException('Username already exists');
    }

    user = await this.usersRepo.findByEmail(payload.email);
    if (user) {
      throw new BadRequestException('Email already exists');
    }

    // Hash the password
    // Generate a salt
    const salt = randomBytes(8).toString('hex');

    // Hash the salt and the password together
    const hash = (await scrypt(payload.password, salt, 32)) as Buffer;

    // Join the hashed result and the salt together
    const passwordHash = salt + '.' + hash.toString('hex');

    return {
      ...payload,
      password: passwordHash,
    };
  }

  async signin({ username, password }: SigninDto) {
    const user = await this.usersRepo.findByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Bad password');
    }

    return user;
  }
}
