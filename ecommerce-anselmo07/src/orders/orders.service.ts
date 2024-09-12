import { Injectable } from "@nestjs/common";
import { OrdersRepository } from "./orders.repository";
import { Orders } from "src/entity/orders.entity";
import { Products } from "src/Products/products.entity";

@Injectable()
export class OrdersService{
    constructor(private readonly ordersRepository: OrdersRepository){}

    getOrder(orderId: string): Promise<Orders>{
        return this.ordersRepository.getOrder(orderId);
    }

    addOrder(userId: string, products:{id: string}[]): Promise<Orders>{
        return this.ordersRepository.addOrder(userId, products);
    }
    
}