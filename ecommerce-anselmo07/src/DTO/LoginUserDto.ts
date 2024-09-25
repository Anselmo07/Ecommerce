import { IsEmail, IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @IsString()
    password:string;

    @IsEmpty()
    isAdmin:boolean;
}