import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { Orders } from "src/entity/orders.entity";
import { CreateOrderDto } from "src/DTO/CreateOrderDto";

@Controller("orders")
export class OrdersController{
    constructor(private readonly ordersService: OrdersService){}

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getOrder(@Param('id') orderId: string): Promise<Orders> {
        return this.ordersService.getOrder(orderId);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    addOrde(@Body() orderData:CreateOrderDto): Promise<Orders>{
        return this.ordersService.addOrder(orderData.userId, orderData.products);
    }
}