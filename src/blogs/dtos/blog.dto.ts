import { Expose } from 'class-transformer';

export class BlogDto {
  @Expose()
  title: string;

  @Expose()
  content: string;
}
