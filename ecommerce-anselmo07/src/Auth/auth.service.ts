import { Injectable } from "@nestjs/common";
import { UsersRepository } from "src/Users/users.repository";

@Injectable()
export class AuthService {
    constructor(private userRepository: UsersRepository){

    }
    getAuth() {
        return 'get Auth';
    }

    async validateUser(email: string , password: string){
        const user = await this.userRepository.findByEmail(email);

        if (!user || user.password !== password){
            return null;
        }

        return user;
    }
}