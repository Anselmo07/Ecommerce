import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./users.entity";
import { Repository } from "typeorm";
import { Orders } from "src/entity/orders.entity";

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(Users) private readonly usersRepository : Repository<Users>,
        @InjectRepository(Orders) private readonly ordersRepository : Repository<Orders>
    ){}
        
    

    async getUsers(page: number =1,limit: number = 5): Promise<Users[]>{
        if (page < 1) page = 1;
        if (limit < 1) limit = 5;

        const [users, total] = await this.usersRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        });

        return users;
    }    
    

    async getById(id: string):Promise<Users> {
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: ['orders_id'],
            select:['id', 'name','email', 'orders_id']
        });

        if (!user) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }

        const orders = user.orders_id.map(order => ({
            id: order.id,
            date: order.date,
        }));

        return {
            ...user,
            ...orders,
        };
    }

    async createUsers(user: Users):Promise<Users> {
        const newUser = this.usersRepository.create(user);
        return this.usersRepository.save(newUser);
    }

    async UpdateUsers(id: number, user: Users):Promise<Users>{
        const buscarId = await this.usersRepository.preload({id, ...user,});
        
        if (!buscarId) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }

        return this.usersRepository.save(buscarId);
    }

    async deleteById(id: number):Promise<void>{
        const initial = await this.usersRepository.delete(id);

        if (initial.affected === 0) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
    }

    async findByEmail(email: string): Promise<Users>{
        return this.usersRepository.findOne({where:{email}});
    }
}
