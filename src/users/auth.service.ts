import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup({ email, password }: { email: string; password: string }) {
    // See if email is in use
    const users = await this.usersService.find(email);
    if (users.length > 0) {
      throw new BadRequestException('User already exists');
    }

    // Hash the password
    // Generate a salt
    const salt = randomBytes(8).toString('hex');

    // Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // Join the hashed result and the salt together
    const passwordHash = salt + '.' + hash.toString('hex');

    // Create a new user and save it
    const newUser = this.usersService.create({
      email,
      password: passwordHash,
    });

    return {
      id: 1,
      ...newUser,
    };
  }

  async signin({ email, password }: { email: string; password: string }) {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Bad password');
    }

    return {
      id: 1,
      ...user,
    };
  }
}
