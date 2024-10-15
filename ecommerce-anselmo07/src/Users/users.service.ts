import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { Users } from "./users.entity";
import { CreateUserDto } from "../DTO/CreateUserDto";

@Injectable()
export class UsersService{
    constructor(private usersRepository: UsersRepository){  
    }
    
    getUsers(page: number = 1, limit: number = 5): Promise<Users[]> {
        return this.usersRepository.getUsers(page, limit);
    }

    getUsersById(id: string){
        return this.usersRepository.getById(id);
    }

    createUsers(user: Omit<CreateUserDto, 'id'>): Promise<Users>{
        return this.usersRepository.createUsers(user);
    }

    updateUsers(id: string, user: Partial<CreateUserDto>): Promise<Users>{
        return this.usersRepository.UpdateUsers(id, user);
    }

    deleteUsersById(id: string ){
        return this.usersRepository.deleteById(id);
    }

    findByEmail(email:string){
        return this.usersRepository.findByEmail(email);
    }
}