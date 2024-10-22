import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./users.entity";
import { Repository } from "typeorm";
import { Orders } from "../entity/orders.entity";
import { CreateUserDto } from "../DTO/CreateUserDto";

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
            relations: ['orders_id', 'orders_id.orderDetails', 'orders_id.orderDetails.products'],
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

        };
    }

    async createUsers(user: CreateUserDto):Promise<Users> {
        const newUser = this.usersRepository.create(user);
        return this.usersRepository.save(newUser);
    }

    async UpdateUsers(id: string, user: Partial<CreateUserDto>):Promise<Users>{
        const buscarId = await this.usersRepository.preload({id, ...user,});
        
        if (!buscarId) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }

        return this.usersRepository.save(buscarId);
    }

    async deleteById(id: string):Promise<void>{
        const initial = await this.usersRepository.delete(id);

        if (initial.affected === 0) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
    }

    async findByEmail(email: string): Promise<Users>{
        return this.usersRepository.findOne({where:{email}});
    }
}
