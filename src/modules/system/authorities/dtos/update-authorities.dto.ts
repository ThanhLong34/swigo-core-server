import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAuthoritiesDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  parentId: number;
}
