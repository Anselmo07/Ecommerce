import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

// function validateRequest(request: Request){
//     const token = request.headers['token'];
//     return token === '1234'
// }

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private authService: AuthService){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    private validateRequest(request:any): boolean{
        const authorization = request.headers['authorization'];
        console.log('Authorization Header:', authorization);

        if (!authorization){
            return false;
        }

        const basicPrefix = /^Basic /;
        if (!basicPrefix.test(authorization)) {
            return false;
        }

        const credentialsBase64 = authorization.substring(6);
        const credentials = Buffer.from(credentialsBase64, 'base64').toString('utf-8');
        const [email, password] = credentials.split(':');
        console.log('Email:', email); // Debugging
        console.log('Password:', password); // Debugging

        if (!email || !password) {
            return false;
        }

        const user = this.authService.validateUser(email, password);
        return !!user;
    }
}