// user-update.dto.ts
import { IsOptional, IsString, IsEmail, Length, Matches, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateDto {
    @IsOptional()
    @IsString()
    @Length(3, 80)
    @ApiProperty({ example: 'Juan', required: false })
    name?: string;

    @IsOptional()
    @IsString()
    @IsEmail()
    @ApiProperty({ example: 'example@gmail.com', required: false })
    email?: string;

    @IsOptional()
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/, {
        message: 'La contraseña debe tener al menos una letra mayúscula, una minúscula, un número y un carácter especial (!@#$%^&*) y debe tener entre 8 y 15 caracteres.',
    })
    @ApiProperty({ example: 'Password123!', required: false })
    password?: string;

    @IsOptional()
    @IsString()
    @Length(3, 80)
    @ApiProperty({ example: 'Calle Falsa 123', required: false })
    address?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: '123456', required: false })
    phone?: string;

    @IsOptional()
    @IsString()
    @Length(5, 20)
    @ApiProperty({ example: 'Mexico', required: false })
    country?: string;

    @IsOptional()
    @IsString()
    @Length(5, 20)
    @ApiProperty({ example: 'Ciudad de México', required: false })
    city?: string;

    @IsOptional()
    @IsString()
    isAdmin?: string;
}
