import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private readonly authService: AuthService, private readonly jwtService:JwtService){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization']?.split(' ')[1] ?? '';
        if(!token){
            throw new UnauthorizedException('Bearer token not found');
        }try{
            const secret = process.env.JWT_SECRET;
            console.log('JWT_SECRET:', secret);
            const payload = this.jwtService.verify(token,{secret});
            payload.roles = ['admin'];
            request.user = payload;
            console.log('JWT_SECRET:', secret);
            return true;
        } catch (err){
            console.log('Token verification error:', err);
            throw new UnauthorizedException('Invalid token');
        }
    }

}