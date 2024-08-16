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
  Query,
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
import { ResponseCode } from '@/enums/response.enum';
import { Response } from '@/types/response/response.type';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private readonly usersSrv: UsersService,
    private readonly authSrv: AuthService,
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
    const user = await this.usersSrv.create(payload);
    return user;
  }

  // Đăng ký
  @Post('signup')
  async signup(@Body() payload: CreateUserDto, @Session() session: any) {
    const user = await this.usersSrv.create(payload);
    session.userId = user.id;
    return user;
  }

  // Đăng nhập
  @Post('signin')
  async signin(@Body() payload: SigninDto, @Session() session: any) {
    const user = await this.authSrv.signin(payload);
    session.userId = user.id;
    return user;
  }

  @Post('signout')
  signout(@Session() session: any) {
    session.userId = null;
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.usersSrv.findById(+id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Get()
  async findMany(
    @Query('getAll') getAll: string = '',
    @Query('pageNumber') pageNumber: string = '',
    @Query('pageSize') pageSize: string = '',
    @Query('uuid') uuid: string = '',
    @Query('username') username: string = '',
    @Query('email') email: string = '',
    @Query('nickName') nickName: string = '',
  ): Promise<Response> {
    try {
      const result = await this.usersSrv.findMany({
        getAll: !!getAll,
        pageNumber: +pageNumber,
        pageSize: +pageSize,
        uuid,
        username,
        email,
        nickName,
      });
      return {
        code: ResponseCode.OK,
        message: 'Found',
        data: {
          list: result,
          total: result.length,
        },
      };
    } catch (err) {
      return {
        code: ResponseCode.FAILED,
        message: err.message,
        data: null,
      };
    }
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    return this.usersSrv.update(+id, payload);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersSrv.delete(+id);
  }
}
