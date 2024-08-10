import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAuthoritiesDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsOptional()
  parentId: number;
}
