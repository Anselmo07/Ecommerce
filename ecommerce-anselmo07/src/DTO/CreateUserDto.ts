import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class CreateUserDto {
    
    @IsNotEmpty()
    @IsString()
    @Length(3, 80)
    @ApiProperty({
        example: 'Juan'
    })
    name:string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty({
        example: 'example@gmail.com'
    })
    email: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/, {
        message: 'La contraseña debe tener al menos una letra mayúscula, una minúscula, un número y un carácter especial (!@#$%^&*) y debe tener entre 8 y 15 caracteres.',})
    @ApiProperty({
        example: 'password'
    })    
    password:string;

    @IsString()
    @Length(3, 80)
    @ApiProperty({
        example: 'calle falsa 123'
    })
    address: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: '123456'
    })
    phone: string;

    @IsString()
    @Length(5, 20)
    @ApiProperty({
        example: 'Mexico'
    })    
    country: string;

    @IsString()
    @Length(5, 20)
    @ApiProperty({
        example: 'Ciudad de mexico'
    })
    city: string;
}