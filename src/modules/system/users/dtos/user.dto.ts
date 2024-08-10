import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  uuid?: string;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  nickName: string;
}
