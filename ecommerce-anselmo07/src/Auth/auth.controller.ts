import { BadRequestException, Body, Controller, Get, Post, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { throwError } from "rxjs";

@Controller("auth")
export class AuthController{
    constructor(private readonly authService: AuthService){}
    
    @Get('auth')
    getAuth(){
        return this.authService.getAuth();
    }

    @Post('signin')
    async postAuth(@Body () body:{email: string, password: string}){
        const {email, password} = body;

        if(!email || !password ){
            throw new BadRequestException('Se requiere email o contrasena');
        }
        const user = await this.authService.validateUser(email, password);

        if(!user){
            throw new UnauthorizedException('Email o contrasena son incorrectas');
        }
        return { message: 'Login exitoso', userId: user.id };
    }


}