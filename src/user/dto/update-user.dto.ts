import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    refreshToken: string;

    @IsBoolean()
    @IsOptional()
    isActive: boolean;

    @IsDate()
    updatedAt: Date;
}
