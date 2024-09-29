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
  ParseArrayPipe,
  ParseBoolPipe,
  HttpException,
  HttpStatus,
  ParseIntPipe,
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

  @Delete('deleteByIds')
  @UseGuards(AuthGuard)
  async deleteByIds(
    @Query(
      'ids',
      new ParseArrayPipe({
        items: Number,
        separator: ',',
      }),
    )
    ids: number[] = [],
  ): Promise<Response> {
    try {
      const _ = await this.usersSrv.softDeleteByIds(ids);
      return {
        code: ResponseCode.OK,
        message: 'Deleted many successfully',
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

  @Get('whoami')
  @UseGuards(AuthGuard)
  async whoAmI(@CurrentUser() user: UserDto): Promise<Response> {
    return {
      code: ResponseCode.OK,
      message: 'Who am I',
      data: user ? plainToClass(UserDto, user) : null,
    };
  }

  @Post('refreshSession')
  async refreshSession(
    @Body() data: { uuid: string },
    @Session() session: any,
  ): Promise<Response> {
    try {
      const result = await this.usersSrv.findOne('uuid', data.uuid);
      session.userId = result?.id || null;

      return {
        code: ResponseCode.OK,
        message: 'Refreshed session successfully',
        data: result ? { id: result.id } : null,
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
    @Query(
      'getAll',
      new ParseBoolPipe({
        errorHttpStatusCode: 400,
        exceptionFactory: (err: string) => {
          throw new HttpException(`${err}: getAll`, HttpStatus.BAD_REQUEST);
        },
        optional: true,
      }),
    )
    getAll: boolean = false,
    @Query(
      'pageNumber',
      new ParseIntPipe({
        errorHttpStatusCode: 400,
        exceptionFactory: (err: string) => {
          throw new HttpException(`${err}: pageNumber`, HttpStatus.BAD_REQUEST);
        },
        optional: true,
      }),
    )
    pageNumber: number = 1,
    @Query(
      'pageSize',
      new ParseIntPipe({
        errorHttpStatusCode: 400,
        exceptionFactory: (err: string) => {
          throw new HttpException(`${err}: pageSize`, HttpStatus.BAD_REQUEST);
        },
        optional: true,
      }),
    )
    pageSize: number = 10,
    @Query(
      'sort',
      new ParseArrayPipe({
        items: String,
        separator: ',',
        errorHttpStatusCode: 400,
        exceptionFactory: (err: string) => {
          throw new HttpException(`${err}: sort`, HttpStatus.BAD_REQUEST);
        },
        optional: true,
      }),
    )
    sort: string[] = [],
    @Query('uuid') uuid: string = '',
    @Query('username') username: string = '',
    @Query('email') email: string = '',
    @Query('nickName') nickName: string = '',
  ): Promise<Response> {
    try {
      const result = await this.usersSrv.findMany({
        getAll,
        pageNumber,
        pageSize,
        sort,
        uuid,
        username,
        email,
        nickName,
      });
      return {
        code: ResponseCode.OK,
        message: 'Found',
        data: {
          ...result,
          list: result.list.map((u: UserDto) => plainToClass(UserDto, u)),
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
  async findById(@Param('id') id: number): Promise<Response> {
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

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: number,
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
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: number): Promise<Response> {
    try {
      const _ = await this.usersSrv.softDeleteById(+id);
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
