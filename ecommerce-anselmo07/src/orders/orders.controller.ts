import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { Orders } from "src/entity/orders.entity";
import { CreateOrderDto } from "src/DTO/CreateOrderDto";
import { UUIDValidationPipe } from "src/validator/uuid-validation.pipe";
import { AuthGuard } from "src/Auth/auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Orders')
@Controller("orders")
export class OrdersController{
    constructor(private readonly ordersService: OrdersService){}

    @Get()
    getsOrder():Promise<Orders[]>{
        return this.ordersService.getsOrder();
    }

    @ApiBearerAuth()
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    getOrder(@Param('id', UUIDValidationPipe) orderId: string): Promise<Orders> {
        return this.ordersService.getOrder(orderId);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    addOrde(@Body() orderData:CreateOrderDto): Promise<Orders>{
        return this.ordersService.addOrder(orderData.userId, orderData.products);
    }

    @ApiBearerAuth()
    @Delete(':id')
    deleteOrder(@Param('id', UUIDValidationPipe)id: string){
        return this.ordersService.deleteOrder(id)
    }
}