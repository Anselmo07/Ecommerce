import { BadRequestException, Body, Controller, Get, Post, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { throwError } from "rxjs";
import { LoginUserDto } from "src/DTO/LoginUserDto";
import { User } from "src/Users/users.interface";
import { Users } from "src/Users/users.entity";
import { AuthGuard } from "./auth.guard";

@Controller("auth")
export class AuthController{
    constructor(private readonly authService: AuthService){}
    
    @Get('auth')
    getAuth(){
        return this.authService.getAuth();
    }
    
    @Post('signup')
    async signUp(@Body() signUp: Users){
        const user = await this.authService.signUp(signUp);
        return  user;
    }

    @Post('signin')
    // @UseGuards(AuthGuard)
    singIn(@Body() user: LoginUserDto){
        return this.authService.singIn(user.email, user.password);
    }

}