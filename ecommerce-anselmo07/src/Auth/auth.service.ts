import { BadRequestException, Injectable } from "@nestjs/common";
import { Users } from "src/Users/users.entity";
import { UsersRepository } from "src/Users/users.repository";
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from "src/DTO/LoginUserDto";
import { CreateUserDto } from "src/DTO/CreateUserDto";
import { UsersService } from "src/Users/users.service";
import { User } from "src/Users/users.interface";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService,
        private readonly userRepository: UsersRepository,
        private readonly jwtService: JwtService,
    ){

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

    async signUp (user: Users){
        const emailUser = await this.userRepository.findByEmail(user.email);
        if(emailUser){
            throw new BadRequestException('Email already exist');
        }

        const hashPassword = await bcrypt.hash(user.password, 10);
        if(!hashPassword){
            throw new BadRequestException('password could not funka');
        }

        const newUser= await this.userRepository.createUsers({...user, password:hashPassword});
        return newUser;   
    }

    async singIn(email:string, password:string){
        const dbUser = await this.userRepository.findByEmail(email);
        if(!dbUser){
            throw new BadRequestException('Email already no exist');
        }

        const isPasswordValid = await bcrypt.compare( password, dbUser.password);
        if(!isPasswordValid){
            throw new BadRequestException('Invalid password')
        }

        const userPayload = {
            sub: dbUser.id,
            id: dbUser.id,
            email: dbUser.email
        }
        const token = this.jwtService.sign(userPayload);

        return {success: 'User logged to succesfully', token};
    }
}