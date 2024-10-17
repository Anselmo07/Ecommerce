import { BadRequestException, Body, Controller, Get, Post, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { throwError } from "rxjs";
import { LoginUserDto } from "../DTO/LoginUserDto";
import { User } from "../Users/users.interface";
import { Users } from "../Users/users.entity";
import { AuthGuard } from "./auth.guard";
import { CreateUserDto } from "../DTO/CreateUserDto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Auth')
@Controller("auth")
export class AuthController{
    constructor(private readonly authService: AuthService){}
    
    @Post('signup')
    async signUp(@Body() signUp: CreateUserDto){
        const user = await this.authService.signUp(signUp);
        return  user;
    }

    @Post('signin')
    singIn(@Body() user: LoginUserDto){
        return this.authService.singIn(user.email, user.password);
    }

}