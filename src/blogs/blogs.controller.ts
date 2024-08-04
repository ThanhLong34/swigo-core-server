import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { BlogDto } from './dtos/blog.dto';
import { CreateBlogDto } from './dtos/create-report.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(BlogDto)
  createReport(@Body() body: CreateBlogDto, @CurrentUser() user: User) {
    return this.blogsService.create(body, user);
  }
}
