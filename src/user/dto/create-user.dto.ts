import { IsEmail, IsString, MinLength, IsEnum } from 'class-validator';
import { RoleName } from 'src/role/enums/Role.Name';

export class CreateUserDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsEnum(RoleName)
    role: string;


}
