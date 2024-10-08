import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseArrayPipe,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AuthoritiesService } from './authorities.service';
import { CreateAuthorityDto } from './dtos/create-authority.dto';
import { UpdateAuthorityDto } from './dtos/update-authority.dto';
import { Response } from '@/types/response/response.type';
import { ResponseCode } from '@/enums/response.enum';

@Controller('authorities')
export class AuthoritiesController {
  constructor(private readonly authoritiesSrv: AuthoritiesService) {}

  @Post()
  async create(@Body() data: CreateAuthorityDto): Promise<Response> {
    try {
      const result = await this.authoritiesSrv.create(data);
      return {
        code: ResponseCode.OK,
        message: 'Created successfully',
        data: result,
      };
    } catch (err) {
      return {
        code: ResponseCode.FAILED,
        message: err.message,
        data: null,
      };
    }
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
    @Query('name') name: string = '',
  ): Promise<Response> {
    try {
      const result = await this.authoritiesSrv.findMany({
        getAll: !!getAll,
        pageNumber: +pageNumber,
        pageSize: +pageSize,
        sort,
        name,
      });
      return {
        code: ResponseCode.OK,
        message: 'Found',
        data: result,
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
      const result = await this.authoritiesSrv.findOne('id', +id);
      return {
        code: ResponseCode.OK,
        message: 'Found',
        data: result,
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
  async update(
    @Param('id') id: string,
    @Body() data: UpdateAuthorityDto,
  ): Promise<Response> {
    try {
      const result = await this.authoritiesSrv.update(+id, data);
      return {
        code: ResponseCode.OK,
        message: 'Updated successfully',
        data: result,
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
      const result = await this.authoritiesSrv.softDeleteById(+id);
      return {
        code: ResponseCode.OK,
        message: 'Deleted successfully',
        data: result,
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
