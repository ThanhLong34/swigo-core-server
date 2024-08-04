import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('colors/:color')
  setColor(@Param('color') color: string, @Session() session: any) {
    session.color = color;
    console.log('session', session);
  }

  @Get('colors')
  getColor(@Session() session: any) {
    console.log('session', session);
    return session.color;
  }

  @Get('whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  // Đăng ký
  @Post('signup')
  async createUser(@Body() payload: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(payload);
    session.userId = user.id;
    return user;
  }

  // Đăng nhập
  @Post('signin')
  async signin(@Body() payload: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(payload);
    session.userId = user.id;
    return user;
  }

  @Post('signout')
  signout(@Session() session: any) {
    session.userId = null;
  }

  @Get(':id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    return this.usersService.update(+id, payload);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
