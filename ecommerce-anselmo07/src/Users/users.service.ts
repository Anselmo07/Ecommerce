import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { Users } from "./users.entity";

@Injectable()
export class UsersService{
    constructor(private usersRepository: UsersRepository){
        
    }
    // getUsers(){
    //     return this.usersRepository.getUsers();
    // }
    getUsers(page: number = 1, limit: number = 5): Promise<Users[]> {
        return this.usersRepository.getUsers(page, limit);
    }

    getUsersById(id: string){
        return this.usersRepository.getById(id);
    }

    createUsers(user: Users): Promise<Users>{
        return this.usersRepository.createUsers(user);
    }

    updateUsers(id: number, user: Users): Promise<Users>{
        return this.usersRepository.UpdateUsers(id, user);
    }


    deleteUsersById(id: number){
        return this.usersRepository.deleteById(id);
    }
}