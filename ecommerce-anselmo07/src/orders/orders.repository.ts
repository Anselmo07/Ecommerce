import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
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

    async addOrder(userId: string, products: { id: string }[]): Promise<Orders> {
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) throw new Error('User no encontrado');
    
        const order = new Orders();
        order.user_id = user;
        order.date = new Date();
    
        const orderDetail = new OrderDetails();
        orderDetail.products = [];
        let totalPrice = 0;
    
        for (const { id } of products) {
            const product = await this.productsRepository.findOne({
                where: { id, stock: MoreThan(0) },
            });
    
            if (!product) throw new BadRequestException("El producto no tiene más stock");
    
            product.stock -= 1; 
            await this.productsRepository.save(product);
            
            orderDetail.products.push(product); 
    
            const productPrice = parseFloat(product.price.toString()); 
            if (isNaN(productPrice)) {
                throw new Error('El precio del producto no es válido');
            }
            totalPrice += productPrice;
        }
    
        orderDetail.price = parseFloat(totalPrice.toFixed(2)); 
        await this.orderDetailsRepository.save(orderDetail);
    
        order.orderDetails = orderDetail; 
        await this.ordersRepository.save(order);
    
        return order;
    }
    

    async getOrder(orderId: string): Promise<Orders> {
        const order = await this.ordersRepository.findOne({
            where: { id: orderId },
            relations: ['orderDetails', 'orderDetails.products']});
        if (!order) throw new Error('Order not found');
    
        return order;
    }

    
    async getsOrder(): Promise<Orders[]>{
        return this.ordersRepository.find({relations:['orderDetails', 'orderDetails.products',]});
    }

    async deleteOrder(id:string):Promise<void>{
        const result = await this.ordersRepository.delete(id);
        if (result.affected === 0){
            throw new NotFoundException(`La order con ${id} no se encontro`);
        }
    }
}