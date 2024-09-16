import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDetails } from "src/entity/orderDetails.entity";
import { Orders } from "src/entity/orders.entity";
import { Products } from "src/Products/products.entity";
import { Users } from "src/Users/users.entity";
import { MoreThan, Repository } from "typeorm";

@Injectable()
export class OrdersRepository{
    constructor(
    @InjectRepository(Orders) private readonly ordersRepository: Repository<Orders>,
    @InjectRepository(Users) private readonly usersRepository: Repository<Users>,
    @InjectRepository(Products) private readonly productsRepository: Repository<Products>,
    @InjectRepository(OrderDetails) private readonly orderDetailsRepository: Repository<OrderDetails>
    ){}

    async addOrder(userId: string, product:{id:string}[]): Promise<Orders>{
        const user = await this.usersRepository.findOne({where:{id: userId}});
        if (!user) throw new Error('User no encontrado');

        const order = new Orders();
        order.user_id = user;
        order.date = new Date();

        const orderDetail = new OrderDetails;
        orderDetail.products = [];
        let totalPrice = 0;

        for (const {id} of product){
            const product = await this.productsRepository.findOne({where:{id,stock: MoreThan(0)}});
            if (!product) throw new Error("El producto no tiene mas stock");

            product.stock -= 1;
            await this.productsRepository.save(product);

            orderDetail.products.push(product);
            totalPrice += product.price;
        }

        orderDetail.price = totalPrice;
        await this.orderDetailsRepository.save(orderDetail);

        order.orderDetails = orderDetail;
        await this.orderDetailsRepository.save(order);

        return order;
    }
    
    async getOrder(orderId: string): Promise<Orders> {
        const order = await this.ordersRepository.findOne({
            where: { id: orderId },
            relations: ['orderDetails', 'orderDetails.products']});
        if (!order) throw new Error('Order not found');
    
        return order;
    }
}