import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dtos/create-menu.dto';
import { Response } from '@/types/response/response.type';
import { ResponseCode } from '@/enums/response.enum';
import { UpdateMenuDto } from './dtos/update-menu.dto';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusSrv: MenusService) {}

  @Post()
  async create(@Body() data: CreateMenuDto): Promise<Response> {
    try {
      const result = await this.menusSrv.create(data);
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
    @Query('getAll') getAll: string = '',
    @Query('pageNumber') pageNumber: string = '',
    @Query('pageSize') pageSize: string = '',
    @Query('name') name: string = '',
    @Query('path') path: string = '',
    @Query('hidden') hidden: boolean = false,
    @Query('title') title: string = '',
  ): Promise<Response> {
    try {
      const result = await this.menusSrv.findMany({
        getAll: !!getAll,
        pageNumber: +pageNumber,
        pageSize: +pageSize,
        name,
        path,
        hidden,
        title,
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
      const result = await this.menusSrv.findOne('id', +id);
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
    @Body() data: UpdateMenuDto,
  ): Promise<Response> {
    try {
      const result = await this.menusSrv.update(+id, data);
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
      const result = await this.menusSrv.softDelete(+id);
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
