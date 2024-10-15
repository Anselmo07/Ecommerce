import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty({
        example: 'example@gmail.com'
    })
    email:string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'password'
    })
    password:string;

    @IsEmpty()
    isAdmin:string;
}