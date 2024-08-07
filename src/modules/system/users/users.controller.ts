import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '@/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from '@/guards/auth.guard';
import { SigninDto } from './dtos/signin.dto';
import { AuthService } from '@system/auth/auth.service';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: UserDto) {
    return user;
  }

  // Tạo tài khoản
  @Post()
  @Serialize(UserDto)
  @UseGuards(AuthGuard)
  async createUser(@Body() payload: CreateUserDto) {
    const user = await this.usersService.create(payload);
    return user;
  }

  // Đăng ký
  @Post('signup')
  async signup(@Body() payload: CreateUserDto, @Session() session: any) {
    const user = await this.usersService.create(payload);
    session.userId = user.id;
    return user;
  }

  // Đăng nhập
  @Post('signin')
  async signin(@Body() payload: SigninDto, @Session() session: any) {
    const user = await this.authService.signin(payload);
    session.userId = user.id;
    return user;
  }

  @Post('signout')
  signout(@Session() session: any) {
    session.userId = null;
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.findById(+id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Get()
  getUserList() {
    return this.usersService.findAll();
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    return this.usersService.update(+id, payload);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
