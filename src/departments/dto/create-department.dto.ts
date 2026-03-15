import { IsString, MinLength } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(10)
  description: string;
}