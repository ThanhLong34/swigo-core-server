import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMenuDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  path: string;

  @IsBoolean()
  @IsOptional()
  hidden: string;

  @IsString()
  @IsOptional()
  icon: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsNumber()
  @IsOptional()
  sort: number;

  @IsNumber()
  @IsOptional()
  parentId: number;
}
