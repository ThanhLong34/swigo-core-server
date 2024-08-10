import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { AuthGuard } from '@/guards/auth.guard';
import { Serialize } from '@/interceptors/serialize.interceptor';
import { BlogDto } from './dtos/blog.dto';
import { CreateBlogDto } from './dtos/create-report.dto';
import { CurrentUser } from '@system/users/decorators/current-user.decorator';
import { UserDto } from '@system/users/dtos/user.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsSrv: BlogsService) {}

  @Post()
  @Serialize(BlogDto)
  @UseGuards(AuthGuard)
  createReport(@Body() body: CreateBlogDto, @CurrentUser() user: UserDto) {
    return this.blogsSrv.create(body, user);
  }
}
