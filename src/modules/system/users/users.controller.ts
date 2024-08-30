import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Session,
  UseGuards,
  Query,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from '@/guards/auth.guard';
import { SigninDto } from './dtos/signin.dto';
import { AuthService } from '@system/auth/auth.service';
import { ResponseCode } from '@/enums/response.enum';
import { Response } from '@/types/response/response.type';
import { plainToClass } from 'class-transformer';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersSrv: UsersService,
    private readonly authSrv: AuthService,
  ) {}

  @Get('whoami')
  @UseGuards(AuthGuard)
  async whoAmI(@CurrentUser() user: UserDto): Promise<Response> {
    return {
      code: ResponseCode.OK,
      message: 'Who am I',
      data: user ? plainToClass(UserDto, user) : null,
    };
  }

  // Tạo tài khoản
  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() data: CreateUserDto): Promise<Response> {
    try {
      const result = await this.usersSrv.create(data);
      return {
        code: ResponseCode.OK,
        message: 'Created successfully',
        data: result ? plainToClass(UserDto, result) : null,
      };
    } catch (err) {
      return {
        code: ResponseCode.FAILED,
        message: err.message,
        data: null,
      };
    }
  }

  // Đăng ký
  @Post('signup')
  async signup(
    @Body() payload: CreateUserDto,
    @Session() session: any,
  ): Promise<Response> {
    try {
      const result = await this.usersSrv.create(payload);
      session.userId = result.id;

      return {
        code: ResponseCode.OK,
        message: 'Signup successfully',
        data: result ? plainToClass(UserDto, result) : null,
      };
    } catch (err) {
      return {
        code: ResponseCode.FAILED,
        message: err.message,
        data: null,
      };
    }
  }

  // Đăng nhập
  @Post('signin')
  async signin(
    @Body() payload: SigninDto,
    @Session() session: any,
  ): Promise<Response> {
    try {
      const result = await this.authSrv.signin(payload);
      session.userId = result.id;

      return {
        code: ResponseCode.OK,
        message: 'Signin successfully',
        data: result ? plainToClass(UserDto, result) : null,
      };
    } catch (err) {
      return {
        code: ResponseCode.FAILED,
        message: err.message,
        data: null,
      };
    }
  }

  @Post('signout')
  async signout(@Session() session: any): Promise<Response> {
    session.userId = null;
    return {
      code: ResponseCode.OK,
      message: 'Signout successfully',
      data: null,
    };
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
          list: result.map((u: UserDto) => plainToClass(UserDto, u)),
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

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Response> {
    try {
      const result = await this.usersSrv.findOne('id', +id);
      return {
        code: ResponseCode.OK,
        message: 'Found',
        data: result ? plainToClass(UserDto, result) : null,
      };
    } catch (err) {
      return {
        code: ResponseCode.FAILED,
        message: err.message,
        data: null,
      };
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): Promise<Response> {
    try {
      const result = await this.usersSrv.update(+id, data);
      return {
        code: ResponseCode.OK,
        message: 'Updated successfully',
        data: result ? plainToClass(UserDto, result) : null,
      };
    } catch (err) {
      return {
        code: ResponseCode.FAILED,
        message: err.message,
        data: null,
      };
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Response> {
    try {
      const _ = await this.usersSrv.softDelete(+id);
      return {
        code: ResponseCode.OK,
        message: 'Deleted successfully',
        data: null,
      };
    } catch (err) {
      return {
        code: ResponseCode.FAILED,
        message: err.message,
        data: null,
      };
    }
  }
}
