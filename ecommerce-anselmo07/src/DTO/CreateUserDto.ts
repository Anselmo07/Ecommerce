import { IsEmail, IsEmpty, IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class CreateUserDto {
    
    @IsNotEmpty()
    @IsString()
    @Length(3, 80)
    name:string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/, {
        message: 'La contraseña debe tener al menos una letra mayúscula, una minúscula, un número y un carácter especial (!@#$%^&*) y debe tener entre 8 y 15 caracteres.',})
    password:string;

    @IsString()
    @Length(3, 80)
    address: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsString()
    @Length(5, 20)    
    country: string;

    @IsString()
    @Length(5, 20)
    city: string;

    @IsEmpty()
    isAdmin:boolean;
}